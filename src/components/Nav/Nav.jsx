import React, { useState } from "react";
import "./Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import appFirebase from "../../../src/credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import { DarkAndLight } from "../DarkAndLight/DarkAndLight.jsx";

const auth = getAuth(appFirebase);

export const Nav = ({ correoUsuario, isAdmin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`contenedor-nav nav ${menuOpen ? "open" : ""}`}>
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`padre-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/pacientes" activeClassName="active">
              Pacientes
            </NavLink>
          </li>
          <li>
            <NavLink to="/turnos" activeClassName="active">
              Turnos
            </NavLink>
          </li>
          <li>
            <NavLink to="/usuario" activeClassName="active">
              Usuario
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to="/administrador" activeClassName="active">
                Administrador
              </NavLink>
            </li>
          )}{" "}
          {/* Enlace condicional */}
          <li>
            <button className="btnSignOut" onClick={() => signOut(auth)}>
              <NavLink to="/Login">Cerrar sesión</NavLink>
            </button>
          </li>
          <div className="position">
            <DarkAndLight />
          </div>
        </ul>
      </div>
    </nav>
  );
};
