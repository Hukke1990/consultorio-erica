import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import appFirebase from "../../../credenciales";
import "./EditarUsuario.css"; // Importa el archivo de estilos si es necesario

const db = getFirestore(appFirebase);

export const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState({
    basic: false,
    diagnostic: false,
    qr: false, // Añadir el módulo de QR
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      setLoading(true);
      const usuarioDoc = await getDoc(doc(db, "users", id));
      if (usuarioDoc.exists()) {
        const data = usuarioDoc.data();
        setUsuario({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          email: data.email || "",
        });
        setModules(data.modules || {});
      }
      setLoading(false);
    };

    fetchUsuario();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setModules((prevModules) => ({
      ...prevModules,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", id), {
        ...usuario,
        modules,
      });
      alert("Usuario actualizado con éxito");
      navigate("/administrador/verUsuarios");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un error al actualizar el usuario");
    }
  };

  return (
    <div className="contenedor-registro">
      <div className="padre-registro">
        <h1>Editar Usuario</h1>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <form className="form-registro" onSubmit={handleSubmit}>
            <div className="registros">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
              />
            </div>
            <div className="registros">
              <label>Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={usuario.apellido}
                onChange={handleInputChange}
                placeholder="Apellido"
              />
            </div>
            <div className="registros">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="checkbox">
              <label>Módulos:</label>
              <div className="contenedor-checkbox">
                <div className="checkbox-grupo">
                  <label>Diagnóstico</label>
                  <input
                    type="checkbox"
                    name="diagnostic"
                    checked={modules.diagnostic}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="checkbox-grupo">
                  <label>QR</label>
                  <input
                    type="checkbox"
                    name="qr"
                    checked={modules.qr}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div>
            <div className="botones-registro">
              <button type="submit" className="boton-registro">
                Guardar
              </button>
              <button
                type="button"
                className="boton-registro cancelar"
                onClick={() => navigate("/administrador/verUsuarios")}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
