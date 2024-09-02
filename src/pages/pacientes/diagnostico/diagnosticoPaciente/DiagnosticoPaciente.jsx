import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"; // Importa useParams
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import appFirebase from "../../../../../src/credenciales";
import "./DiagnosticoPaciente.css";
import useUserModules from "../../../../Hook/useModulos/useModules";

const db = getFirestore(appFirebase);

export const DiagnosticoPaciente = ({ uidUsuario }) => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [imagenes, setImagenes] = useState([]); // Cambiado a un array de archivos
  const navigate = useNavigate();
  const modules = useUserModules(uidUsuario);

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  };

  useEffect(() => {
    const obtenerPaciente = async () => {
      try {
        const pacienteDoc = await getDoc(doc(db, "pacientes", id));
        if (pacienteDoc.exists()) {
          const dataPaciente = pacienteDoc.data();

          // Verifica si el paciente pertenece al usuario autenticado
          if (dataPaciente.userId !== uidUsuario) {
            console.error("No tiene permiso para ver este paciente");
            navigate("/pacientes/diagnostico");
            return;
          }

          const edad = calcularEdad(dataPaciente.fechaNacimiento);
          setPaciente({ ...dataPaciente, edad });
        } else {
          console.error("No se encontró el paciente");
        }
      } catch (error) {
        console.error("Error al obtener el paciente:", error);
      }
    };

    obtenerPaciente();
  }, [id, uidUsuario, navigate]);

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const handleFileChange = (e) => {
    setImagenes(Array.from(e.target.files)); // Convertir FileList a array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Guardar diagnóstico en la subcolección "diagnosticos" dentro del documento del paciente
      const diagnosticosCollection = collection(
        db,
        `pacientes/${id}/diagnosticos`
      );
      const diagnosticoDoc = await addDoc(diagnosticosCollection, {
        diagnostico,
        fecha: new Date().toLocaleDateString(),
        userId: uidUsuario,
        imagenes: imagenes.map((imagen) => imagen.name), // Guardar los nombres de las imágenes
      });

      // Aquí puedes agregar la lógica para subir las imágenes a un almacenamiento (por ejemplo, Firebase Storage)
      // y asociarlas con el documento del diagnóstico.

      alert("Diagnóstico registrado con éxito");
      setTimeout(() => navigate("/pacientes/diagnostico"), 1000);
    } catch (error) {
      console.error("Error al registrar el diagnóstico:", error);
      alert("Hubo un error al registrar el diagnóstico");
    }
  };

  return (
    <div className="contenedor-diagnosticoPaciente">
      <div className="padre-diagnosticoPaciente">
        {paciente && (
          <>
            <h1>Diagnostico</h1>
            <div className="datosPacientes">
              <p>
                <span>Fecha de registro:</span>{" "}
                {new Date().toLocaleDateString()}
              </p>
              <p>
                <span>Nombre:</span> {capitalize(paciente.nombre)}
              </p>
              <p>
                <span>Apellido:</span> {capitalize(paciente.apellido)}
              </p>
              <p>
                <span>DNI:</span> {paciente.dni}
              </p>
              <p>
                <span>Edad:</span> {paciente.edad} años
              </p>
            </div>

            <div className="contenedor-formDiagnostico">
              <form onSubmit={handleSubmit}>
                <label htmlFor="diagnostico">Diagnóstico</label>
                <textarea
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  placeholder="Escriba el diagnóstico aquí..."
                ></textarea>
                {modules.diagnostic && (
                  <>
                    <label htmlFor="imagen">Agregar Imágenes</label>
                    <input type="file" multiple onChange={handleFileChange} />
                  </>
                )}
                <div className="botones-registro">
                  <button className="boton-registro" type="submit">
                    Guardar
                  </button>
                  <NavLink to="/pacientes/diagnostico">
                    <button className="boton-registro cancelar" type="button">
                      Cancelar
                    </button>
                  </NavLink>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
