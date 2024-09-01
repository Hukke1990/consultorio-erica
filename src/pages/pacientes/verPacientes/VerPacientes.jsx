import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import usePacientes from "../../../Hook/usePacientes/UsePacientes";
import "./VerPacientes.css";

export const VerPacientes = ({ uidUsuario }) => {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroApellido, setFiltroApellido] = useState("");
  const navigate = useNavigate();
  const { pacientes, isLoading, borrarPaciente } = usePacientes(
    uidUsuario,
    filtroNombre,
    filtroApellido
  );

  const editarPaciente = (id) => {
    navigate(`/pacientes/verPacientes/editarPaciente/${id}`);
  };

  return (
    <div className="contenedor-pacientes">
      <div className="padre-pacientes">
        <div className="padre-titulo titulo">
          <h1>Ver Pacientes</h1>
        </div>

        <div className="filtros">
          <h3>Buscar pacientes</h3>
          <div className="contenedor-filtros">
            <div className="filtro-input">
              <label>Nombre:</label>
              <input
                type="text"
                placeholder="Filtrar por nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </div>
            <div className="filtro-input">
              <label>Apellido:</label>
              <input
                type="text"
                placeholder="Filtrar por apellido"
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
                    <strong>Nombre:</strong> <span>{paciente.nombre}</span>
                  </li>
                  <li>
                    <strong>Apellido:</strong> <span>{paciente.apellido}</span>
                  </li>
                  <li>
                    <strong>DNI:</strong> <span>{paciente.dni}</span>
                  </li>
                </ul>
                <div className="acciones-paciente">
                  <button onClick={() => editarPaciente(paciente.id)}>
                    Editar
                  </button>
                  <button
                    className="boton-borrar"
                    onClick={() => borrarPaciente(paciente.id)}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron pacientes.</p>
          )}
        </div>
        <NavLink to={`/pacientes`}>
          <button className="boton-volver">Volver</button>
        </NavLink>
      </div>
    </div>
  );
};
