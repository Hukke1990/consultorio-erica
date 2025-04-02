import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import usePacientes from "../../../Hook/usePacientes/UsePacientes";
import "./VerPacientes.css";
import { IdiomaContext } from "../../../components/IdiomaContext/IdiomaContext";

export const VerPacientes = ({ uidUsuario }) => {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroApellido, setFiltroApellido] = useState("");
  const navigate = useNavigate();
  const { pacientes, isLoading, borrarPaciente } = usePacientes(
    uidUsuario,
    filtroNombre,
    filtroApellido
  );
  const { idioma } = useContext(IdiomaContext); // Obtener el idioma del contexto

  const textos = {
    es: {
      verPacientes: "Ver Pacientes",
      buscarPacientes: "Buscar pacientes",
      nombre: "Nombre",
      filtrarNombre: "Filtrar por nombre",
      apellido: "Apellido",
      filtrarApellido: "Filtrar por apellido",
      editar: "Editar",
      borrar: "Borrar",
      noPacientes: "No se encontraron pacientes.",
      volver: "Volver",
    },
    en: {
      verPacientes: "View Patients",
      buscarPacientes: "Search patients",
      nombre: "First Name",
      filtrarNombre: "Filter by first name",
      apellido: "Last Name",
      filtrarApellido: "Filter by last name",
      editar: "Edit",
      borrar: "Delete",
      noPacientes: "No patients found.",
      volver: "Back",
    },
  };

  const editarPaciente = (id) => {
    navigate(`/pacientes/verPacientes/editarPaciente/${id}`);
  };

  return (
    <div className="contenedor-pacientes">
      <div className="padre-pacientes">
        <div className="padre-titulo titulo">
          <h1>{textos[idioma].verPacientes}</h1>
        </div>

        <div className="filtros">
          <h3>{textos[idioma].buscarPacientes}</h3>
          <div className="contenedor-filtros">
            <div className="filtro-input">
              <label>{textos[idioma].nombre}:</label>
              <input
                type="text"
                placeholder={textos[idioma].filtrarNombre}
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </div>
            <div className="filtro-input">
              <label>{textos[idioma].apellido}:</label>
              <input
                type="text"
                placeholder={textos[idioma].filtrarApellido}
                value={filtroApellido}
                onChange={(e) => setFiltroApellido(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="lista-pacientes">
          {isLoading ? (
            <div className="spinner"></div>
          ) : pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <div key={paciente.id} className="filtro-paciente paciente">
                <ul>
                  <li>
                    <strong>{textos[idioma].nombre}:</strong>{" "}
                    <span>{paciente.nombre}</span>
                  </li>
                  <li>
                    <strong>{textos[idioma].apellido}:</strong>{" "}
                    <span>{paciente.apellido}</span>
                  </li>
                  <li>
                    <strong>DNI:</strong> <span>{paciente.dni}</span>
                  </li>
                </ul>
                <div className="acciones-paciente">
                  <button onClick={() => editarPaciente(paciente.id)}>
                    {textos[idioma].editar}
                  </button>
                  <button
                    className="boton-borrar"
                    onClick={() => borrarPaciente(paciente.id)}
                  >
                    {textos[idioma].borrar}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>{textos[idioma].noPacientes}</p>
          )}
        </div>
        <NavLink to={`/pacientes`}>
          <button className="boton-volver">{textos[idioma].volver}</button>
        </NavLink>
      </div>
    </div>
  );
};
