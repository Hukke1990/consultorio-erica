import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { toDataURL } from "qrcode";
import "./GenerarCitas.css";
import appFirebase from "../../../../credenciales";
import useUserModules from "../../../../Hook/useModulos/useModules";
import Calendario from "../../../../components/Calendario/Calendario";
import SelectorTiempo from "../../../../components/SelectorTiempo/SelectorTiempo";
import { NavLink } from "react-router-dom";

const db = getFirestore(appFirebase);

const useGenerarCitas = (uidUsuario) => {
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [turnoNoDisponible, setTurnoNoDisponible] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const modules = useUserModules(uidUsuario);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Obtener pacientes
        const querySnapshotPacientes = await getDocs(
          collection(db, "pacientes")
        );
        const pacientesList = querySnapshotPacientes.docs
          .map((doc) => doc.data())
          .filter((paciente) => paciente.userId === uidUsuario);
        setPacientes(pacientesList);

        // Obtener turnos
        const querySnapshotTurnos = await getDocs(collection(db, "turnos"));
        const turnosList = querySnapshotTurnos.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((turno) => turno.userId === uidUsuario); // Filtrar turnos del usuario actual

        // Verificar si los turnos se están obteniendo correctamente
        console.log("Turnos obtenidos:", turnosList);

        setTurnos(turnosList);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, [uidUsuario]);

  useEffect(() => {
    if (fecha && hora) {
      // Normalizar los datos de fecha y hora para la comparación
      const fechaSeleccionada = new Date(fecha).toISOString().split("T")[0];
      const horaSeleccionada = hora.padStart(5, "0"); // Asegura que la hora tenga el formato "HH:MM"

      // Verificar si el turno está ocupado
      const turnoOcupado = turnos.some(
        (turno) =>
          turno.fecha === fechaSeleccionada && turno.hora === horaSeleccionada
      );
      setTurnoNoDisponible(turnoOcupado);
      console.log(`Turno ocupado: ${turnoOcupado}`);
    }
  }, [fecha, hora, turnos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (turnoNoDisponible) {
      alert("Este turno no está disponible.");
      return;
    }

    try {
      await addDoc(collection(db, "turnos"), {
        userId: uidUsuario,
        nombre,
        apellido,
        fecha,
        hora,
        motivo,
      });
      alert("Turno registrado con éxito");

      if (modules.qr) {
        // Generar el evento en formato iCalendar
        const startDate = new Date(`${fecha}T${hora}`)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");
        const endDate = new Date(
          new Date(`${fecha}T${hora}`).getTime() + 30 * 60000
        )
          .toISOString()
          .replace(/-|:|\.\d+/g, ""); // Duración de 30 minutos
        const icsData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Turno Médico
DESCRIPTION:Motivo: ${motivo}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:Consultorio
END:VEVENT
END:VCALENDAR
        `.trim();

        // Generar el código QR
        toDataURL(
          `data:text/calendar;charset=utf8,${encodeURIComponent(icsData)}`,
          { width: 200, margin: 2 },
          (err, url) => {
            if (err) {
              console.error("Error al generar el código QR:", err);
              return;
            }
            setQrCodeUrl(url);
          }
        );
      }

      // Limpiar los campos del formulario
      setNombre("");
      setApellido("");
      setFecha("");
      setHora("");
      setMotivo("");
    } catch (error) {
      console.error("Error al registrar el turno:", error);
      alert("Hubo un error al registrar el turno");
    }
  };

  return {
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
  };
};

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
                <SelectorTiempo
                  hora={hora}
                  setHora={setHora}
                  turnos={turnos}
                  fecha={fecha}
                />
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
        </form>
      </div>
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
      {qrCodeUrl && (
        <div className="qr-code">
          <img src={qrCodeUrl} alt="Código QR de la cita" />
        </div>
      )}
    </div>
  );
};
