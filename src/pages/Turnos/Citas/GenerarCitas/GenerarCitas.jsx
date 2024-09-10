import React from "react";
import "./GenerarCitas.css";
import Calendario from "../../../../components/Calendario/Calendario";
import SelectorTiempo from "../../../../components/SelectorTiempo/SelectorTiempo";
import { NavLink } from "react-router-dom";
import useGenerarCitas from "../../../../Hook/useGenerarCita/useGenerarCitas";

export const GenerarCitas = ({ uidUsuario }) => {
  const {
    pacientes,
    turnos,
    nombre,
    setNombre,
    apellido,
    setApellido,
    fecha,
    setFecha,
    hora,
    setHora,
    motivo,
    setMotivo,
    turnoNoDisponible,
    qrCodeUrl,
    handleSubmit,
  } = useGenerarCitas(uidUsuario);

  return (
    <div className="contenedor-registro">
      <div className="padre-registro">
        <h1>Generar Cita</h1>
        <form className="form-registro" onSubmit={handleSubmit}>
          <fieldset className="fieldset-registro">
            <div className="registros">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="registros">
              <label>Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="fecha-turno">
              <label>Fecha</label>
              <Calendario fecha={fecha} setFecha={setFecha} turnos={turnos} />
            </div>
            <div className="ocupado">
              <div className="registros">
                <label>Hora</label>
                <div className="SelectorTiempo">
                  <SelectorTiempo
                    hora={hora}
                    setHora={setHora}
                    turnos={turnos}
                    fecha={fecha}
                  />
                </div>
              </div>
              {turnoNoDisponible && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>
                  Este turno ya está ocupado.
                </p>
              )}
            </div>
            <div className="registros">
              <label>Motivo</label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Escriba el motivo del turno..."
                required
              ></textarea>
            </div>
          </fieldset>
          <div className="botones-registro">
            <button type="submit" className="boton-registro">
              Registrar
            </button>
            <NavLink to="/turnos">
              <button type="button" className="boton-registro cancelar">
                Cancelar
              </button>
            </NavLink>
          </div>
        </form>
      </div>
      {qrCodeUrl && (
        <div className="qr-code">
          <img src={qrCodeUrl} alt="Código QR de la cita" />
        </div>
      )}
    </div>
  );
};
