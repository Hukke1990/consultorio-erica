import React, { useState, useContext } from "react";
import "./Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import appFirebase from "../../../src/credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import { DarkAndLight } from "../DarkAndLight/DarkAndLight.jsx";
import { IdiomaContext } from "../IdiomaContext/IdiomaContext.jsx";

const auth = getAuth(appFirebase);

export const Nav = ({ correoUsuario, isAdmin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { idioma, setIdioma } = useContext(IdiomaContext); // Obtener y establecer el idioma del contexto

  const textos = {
    es: {
      inicio: "Inicio",
      pacientes: "Pacientes",
      turnos: "Turnos",
      usuario: "Usuario",
      administrador: "Administrador",
      cerrarSesion: "Cerrar sesión",
    },
    en: {
      inicio: "Home",
      pacientes: "Patients",
      turnos: "Appointments",
      usuario: "User",
      administrador: "Admin",
      cerrarSesion: "Log Out",
    },
  };

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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`contenedor-nav nav ${menuOpen ? "open" : ""}`}>
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`padre-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active" onClick={closeMenu}>
              {textos[idioma].inicio}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pacientes"
              activeClassName="active"
              onClick={closeMenu}
            >
              {textos[idioma].pacientes}
            </NavLink>
          </li>
          <li>
            <NavLink to="/turnos" activeClassName="active" onClick={closeMenu}>
              {textos[idioma].turnos}
            </NavLink>
          </li>
          <li>
            <NavLink to="/usuario" activeClassName="active" onClick={closeMenu}>
              {textos[idioma].usuario}
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/administrador"
                activeClassName="active"
                onClick={closeMenu}
              >
                {textos[idioma].administrador}
              </NavLink>
            </li>
          )}
          <li>
            <button
              className="btnSignOut"
              onClick={() => {
                signOut(auth);
                closeMenu();
              }}
            >
              <NavLink to="/Login">{textos[idioma].cerrarSesion}</NavLink>
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
