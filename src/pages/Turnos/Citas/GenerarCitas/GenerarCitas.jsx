import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./GenerarCitas.css";
import useGenerarCitas from "../../../../Hook/useGenerarCita/useGenerarCitas";

export const GenerarCitas = ({ uidUsuario }) => {
  const {
    pacientes,
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

  const navigate = useNavigate();

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const filteredNombres = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
  const filteredApellidos = pacientes.filter((p) =>
    p.apellido.toLowerCase().includes(apellido.toLowerCase())
  );

  return (
    <div className="contenedor-turnos">
      <div className="padre-GenerarTurnos">
        <div className="padre-titulo titulo">
          <h1>Generar Turno</h1>
        </div>
        <form onSubmit={handleSubmit} className="form-turnos">
          <fieldset className="fieldset-turnos">
            <div className="campo">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                list="nombres"
                placeholder="Nombre"
                required
              />
              <datalist id="nombres">
                {filteredNombres.map((paciente, index) => (
                  <option key={index} value={paciente.nombre} />
                ))}
              </datalist>
            </div>

            <div className="campo">
              <label>Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={handleApellidoChange}
                list="apellidos"
                placeholder="Apellido"
                required
              />
              <datalist id="apellidos">
                {filteredApellidos.map((paciente, index) => (
                  <option key={index} value={paciente.apellido} />
                ))}
              </datalist>
            </div>

            <div className="campo">
              <label>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                style={{ borderColor: turnoNoDisponible ? "red" : "initial" }}
              />
            </div>
            <div className="ocupado">
              <div className="campo">
                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                  style={{ borderColor: turnoNoDisponible ? "red" : "initial" }}
                />
              </div>
              {turnoNoDisponible && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>
                  Este turno ya está ocupado.
                </p>
              )}
            </div>

            <div className="campo">
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
        {qrCodeUrl && (
          <div className="campo qr-container">
            <img src={qrCodeUrl} alt="Código QR" />
          </div>
        )}
      </div>
    </div>
  );
};
