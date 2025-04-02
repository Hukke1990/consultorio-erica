import React, { useState, useContext } from "react";
import imagenAvatar from "../../../src/assets/logo-medicina.png";
import "./login.css";
import appFirebase from "../../credenciales.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IdiomaContext } from "../IdiomaContext/IdiomaContext.jsx";

const auth = getAuth(appFirebase);

export const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const { idioma, setIdioma } = useContext(IdiomaContext); // Obtener y establecer el idioma del contexto

  const textos = {
    es: {
      emailPlaceholder: "Email",
      passwordPlaceholder: "Contraseña",
      registrate: "Registrate",
      iniciarSesion: "Iniciar Sesión",
      noCuenta: "No tienes una cuenta ? contacta con tu administrador",
      cambiarIdioma: "Cambiar a Inglés",
    },
    en: {
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      registrate: "Sign Up",
      iniciarSesion: "Log In",
      noCuenta: "Don't have an account? Contact your administrator",
      cambiarIdioma: "Switch to Spanish",
    },
  };

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;

    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, password);
      } catch (error) {
        alert("Asegurese de que la contraseña sea de al menos 8 caracteres");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, password);
      } catch (error) {
        alert("Correo o contraseña incorrectos");
      }
    }
  };

  const cambiarIdioma = () => {
    setIdioma(idioma === "es" ? "en" : "es");
  };

  return (
    <div className="contenedor">
      <div className="contenedor-login">
        <div className="padre">
          <div className="card card-body">
            <img
              src={imagenAvatar}
              alt="logo medicina"
              className="estilo-profile"
            />
            <form onSubmit={functAutenticacion}>
              <input
                type="text"
                placeholder={textos[idioma].emailPlaceholder}
                className="cajatexto"
                id="email"
              />
              <input
                type="password"
                placeholder={textos[idioma].passwordPlaceholder}
                className="cajatexto"
                id="password"
              />
              <button className="btnfrom">
                {registrando
                  ? textos[idioma].registrate
                  : textos[idioma].iniciarSesion}
              </button>
            </form>
            <div className="contenedorTest">
              <h4 className="texto">{textos[idioma].noCuenta}</h4>
              <div className="contenedorSwitchIdioma">
                <label className="textoIdioma">Idioma</label>
                <label className="switchIdioma">
                  <input
                    type="checkbox"
                    checked={idioma === "en"}
                    onChange={cambiarIdioma}
                  />
                  <span className="sliderIdioma roundIdioma"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
