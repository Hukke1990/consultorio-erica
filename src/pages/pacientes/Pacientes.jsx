import React, { useContext } from "react";
import "./Pacientes.css";
import { NavLink } from "react-router-dom";
import { IdiomaContext } from "../../components/IdiomaContext/IdiomaContext.jsx";

export const Pacientes = () => {
  const { idioma } = useContext(IdiomaContext); // Obtener el idioma del contexto

  const textos = {
    es: {
      titulo: "Pacientes",
      registro: "Registro",
      verPacientes: "Ver pacientes",
      diagnostico: "Diagnostico",
      historialClinico: "Historial Clinico",
    },
    en: {
      titulo: "Patients",
      registro: "Register",
      verPacientes: "View patients",
      diagnostico: "Diagnosis",
      historialClinico: "Medical History",
    },
  };

  return (
    <div className="contenedor-pacientes">
      <div className="padre-pacientes">
        <div className="padre-titulo titulo">
          <h1>{textos[idioma].titulo}</h1>
        </div>

        <div className="contenedor-opcionesPacientes">
          <ul>
            <li>
              <NavLink to="/pacientes/registro">
                {textos[idioma].registro}
              </NavLink>
            </li>
            <li>
              <NavLink to="/pacientes/verPacientes">
                {textos[idioma].verPacientes}
              </NavLink>
            </li>
            <li>
              <NavLink to="/pacientes/diagnostico">
                {textos[idioma].diagnostico}
              </NavLink>
            </li>
            <li>
              <NavLink to="/pacientes/historialClinico">
                {textos[idioma].historialClinico}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
