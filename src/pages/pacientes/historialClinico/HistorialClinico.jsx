import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import appFirebase from "../../../../src/credenciales";
import "./HistorialClinico.css";
import { IdiomaContext } from "../../../components/IdiomaContext/IdiomaContext";

const db = getFirestore(appFirebase);

export const HistorialClinico = ({ uidUsuario }) => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();
  const { idioma } = useContext(IdiomaContext); // Obtener el idioma del contexto

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        // Filtrar pacientes por el ID del usuario autenticado
        const q = query(
          collection(db, "pacientes"),
          where("userId", "==", uidUsuario)
        );
        const querySnapshot = await getDocs(q);
        const pacientesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPacientes(pacientesList);
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      }
    };

    obtenerPacientes();
  }, [uidUsuario]);

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const handleSelectPaciente = (id) => {
    navigate(`/pacientes/historialClinico/historalClinicoPaciente/${id}`);
  };

  const textos = {
    es: {
      historialClinico: "Historial Clínico",
      pacientes: "Pacientes",
      volver: "Volver",
    },
    en: {
      historialClinico: "Medical History",
      pacientes: "Patients",
      volver: "Back",
    },
  };

  return (
    <div className="contenedor-historial-clinico">
      <div className="padre-historial-clinico">
        <div className="padre-titulo titulo">
          <h1>{textos[idioma].historialClinico}</h1>
        </div>
        <div className="contenedor-pacientes-historial-clinico">
          <h2>{textos[idioma].pacientes}</h2>
          <ul>
            {pacientes.map((paciente) => (
              <li
                key={paciente.id}
                onClick={() => handleSelectPaciente(paciente.id)}
              >
                {capitalize(paciente.nombre)} {capitalize(paciente.apellido)}
              </li>
            ))}
          </ul>
        </div>
        <div className="contenedor-volver">
          <NavLink to={`/pacientes`}>
            <button className="boton-volver">{textos[idioma].volver}</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
