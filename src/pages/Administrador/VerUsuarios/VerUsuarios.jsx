import React, { useState, useEffect } from "react";
import "./VerUsuarios.css";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import appFirebase from "../../../credenciales";
import { NavLink, useNavigate } from "react-router-dom";
import "./VerUsuarios.css"; // Importa el archivo de estilos si es necesario

const db = getFirestore(appFirebase);

export const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el spinner
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true); // Comienza la carga
      const usuariosCollection = collection(db, "users");
      const usuariosSnapshot = await getDocs(usuariosCollection);
      const usuariosList = usuariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(usuariosList);
      setLoading(false); // Finaliza la carga
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    navigate(`/administrador/editarUsuario/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, "users", id));
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    }
  };

  return (
    <div className="contenedor-pacientes">
      <div className="padre-pacientes">
        <div className="padre-titulo titulo">
          <h2>Lista de Usuarios</h2>
        </div>
        {loading ? (
          <div className="spinner"></div> /* Muestra el spinner */
        ) : (
          <ul>
            {usuarios.map(({ id, nombre, apellido, email }) => (
              <li key={id} className="listaUsuarios">
                <div className="contenedorSpanSpan">
                  <div className="contenedorSpan">
                    <span>{nombre}</span>
                  </div>
                  <div className="contenedorSpan">
                    <span>{apellido}</span>
                  </div>
                  <div className="contenedorSpan">
                    <span>{email}</span>
                  </div>
                  <div className="acciones-paciente btnUsuario">
                    <button onClick={() => handleEdit(id)}>Editar</button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="boton-borrar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="contenedor-volver">
          <NavLink to={`/administrador`}>
            <button className="boton-volver">Volver</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
