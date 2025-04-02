import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import appFirebase from "../../../../src/credenciales";
import "./Diagnostico.css";
import { IdiomaContext } from "../../../components/IdiomaContext/IdiomaContext";

const db = getFirestore(appFirebase);

export const Diagnostico = ({ uidUsuario }) => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();
  const { idioma } = useContext(IdiomaContext); // Obtener el idioma del contexto

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const pacientesRef = collection(db, "pacientes");
        const q = query(pacientesRef, where("userId", "==", uidUsuario)); // Filtrar por el ID del usuario

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
    navigate(`/pacientes/diagnostico/diagnosticoPaciente/${id}`);
  };

  const textos = {
    es: {
      diagnostico: "Diagnostico",
      pacientes: "Pacientes",
      volver: "Volver",
    },
    en: {
      diagnostico: "Diagnosis",
      pacientes: "Patients",
      volver: "Back",
    },
  };

  return (
    <div className="contenedor-diagnostico">
      <div className="padre-diagnostico">
        <div className="padre-titulo titulo">
          <h1>{textos[idioma].diagnostico}</h1>
        </div>
        <div className="contenedor-pacientes-diagnostico">
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
