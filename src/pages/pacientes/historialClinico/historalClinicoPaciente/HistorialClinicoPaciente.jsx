import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import appFirebase from "../../../../../src/credenciales";
import "./HistorialClinicoPaciente.css";
import { IdiomaContext } from "../../../../components/IdiomaContext/IdiomaContext";

const db = getFirestore(appFirebase);

export const HistorialClinicoPaciente = ({ uidUsuario }) => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para el spinner
  const navigate = useNavigate();
  const { idioma } = useContext(IdiomaContext); // Obtener el idioma del contexto

  useEffect(() => {
    const obtenerPacienteYHistorial = async () => {
      try {
        const pacienteDoc = await getDoc(doc(db, "pacientes", id));
        if (pacienteDoc.exists()) {
          const dataPaciente = pacienteDoc.data();
          if (dataPaciente.userId === uidUsuario) {
            setPaciente(dataPaciente);

            // Obtener los diagnósticos del paciente
            const historialSnapshot = await getDocs(
              collection(db, `pacientes/${id}/diagnosticos`)
            );
            const historialList = historialSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setHistorial(historialList);
          } else {
            console.error(
              "Acceso denegado: el usuario no tiene permisos para ver este paciente."
            );
            navigate("/pacientes/historialClinico"); // Redirigir si el usuario no tiene permisos
          }
        } else {
          console.error("No se encontró el paciente");
          navigate("/pacientes/historialClinico"); // Redirigir si no se encuentra el paciente
        }
      } catch (error) {
        console.error("Error al obtener el historial clínico:", error);
      } finally {
        setIsLoading(false); // Ocultar el spinner cuando los datos se hayan cargado
      }
    };

    obtenerPacienteYHistorial();
  }, [id, uidUsuario, navigate]);

  const handleEdit = (entrada) => {
    navigate(
      `/pacientes/historialClinico/editarHistorialClinico/${id}/${entrada.id}`
    );
  };

  const handleDelete = async (docId) => {
    if (
      window.confirm(
        idioma === "es"
          ? "¿Estás seguro de que deseas eliminar esta entrada del historial?"
          : "Are you sure you want to delete this entry from the history?"
      )
    ) {
      try {
        await deleteDoc(doc(db, `pacientes/${id}/diagnosticos`, docId));
        setHistorial(historial.filter((entrada) => entrada.id !== docId));
      } catch (error) {
        console.error("Error al eliminar la entrada del historial:", error);
      }
    }
  };

  const textos = {
    es: {
      historialClinico: "Historial Clínico",
      historialDe: "Historial de",
      fecha: "Fecha",
      diagnostico: "Diagnóstico",
      editar: "Editar",
      borrar: "Borrar",
      volver: "Volver",
    },
    en: {
      historialClinico: "Medical History",
      historialDe: "History of",
      fecha: "Date",
      diagnostico: "Diagnosis",
      editar: "Edit",
      borrar: "Delete",
      volver: "Back",
    },
  };

  return (
    <div className="contenedor-historial-clinico-paciente">
      <div className="padre-historial-clinico-paciente">
        <div className="padre-titulo titulo">
          <h1>{textos[idioma].historialClinico}</h1>
        </div>
        {paciente && (
          <div className="contenedor-historial-clinico-paciente">
            <h2>
              {textos[idioma].historialDe} {paciente.nombre} {paciente.apellido}
            </h2>
            <div className="historial-clinico-paciente">
              {isLoading ? ( // Mostrar el spinner dentro del contenedor
                <div className="spinner"></div>
              ) : (
                <ul>
                  {historial.map((entrada) => (
                    <li key={entrada.id}>
                      <p>
                        <span>{textos[idioma].fecha}:</span> {entrada.fecha}
                      </p>
                      <p>
                        <span>{textos[idioma].diagnostico}:</span>{" "}
                        {entrada.diagnostico}
                      </p>
                      <div className="acciones-paciente">
                        <button onClick={() => handleEdit(entrada)}>
                          {textos[idioma].editar}
                        </button>
                        <button
                          className="boton-borrar"
                          onClick={() => handleDelete(entrada.id)}
                        >
                          {textos[idioma].borrar}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <NavLink to={`/pacientes/historialClinico`}>
          <button className="boton-volver">{textos[idioma].volver}</button>
        </NavLink>
      </div>
    </div>
  );
};
