import React from "react";
import { NavLink } from "react-router-dom";
import "./Administrador.css";

export const Administrador = () => {
  return (
    <div className="contenedor-registro">
      <div className="padre-pacientes">
        <div className="padre-titulo titulo">
          <h1>Administrador</h1>
        </div>

        <div className="contenedor-menuAdministrador">
          <ul>
            <li>
              <NavLink
                to="/administrador/RegistrarUsuario"
                activeClassName="active"
              >
                Registrar usuario
              </NavLink>
            </li>
            <li>
              <NavLink to="/administrador/verUsuarios" activeClassName="active">
                Ver usuario
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
