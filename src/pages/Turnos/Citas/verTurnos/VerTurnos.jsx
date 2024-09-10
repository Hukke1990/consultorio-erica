import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Importa useNavigate
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import appFirebase from "../../../../../src/credenciales";
import "./VerTurnos.css";

const db = getFirestore(appFirebase);

export const VerTurnos = ({ uidUsuario }) => {
  const [turnos, setTurnos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMonth, setOpenMonth] = useState(null); // Estado para el mes abierto
  const navigate = useNavigate(); // Usa el hook useNavigate

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "turnos"));
        const turnosList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((turno) => turno.userId === uidUsuario);

        // Ordenar los turnos por fecha y hora
        turnosList.sort((a, b) => {
          const fechaA = new Date(a.fecha);
          const fechaB = new Date(b.fecha);
          const horaA = a.hora.split(":").map(Number);
          const horaB = b.hora.split(":").map(Number);
          return fechaA - fechaB || horaA[0] - horaB[0] || horaA[1] - horaB[1];
        });

        setTurnos(turnosList);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerTurnos();
  }, [uidUsuario]);

  const groupByMonth = (turnos) => {
    return turnos.reduce((acc, turno) => {
      const month = new Date(turno.fecha).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(turno);
      return acc;
    }, {});
  };

  const handleMonthClick = (month) => {
    setOpenMonth(openMonth === month ? null : month);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "turnos", id));
      setTurnos(turnos.filter((turno) => turno.id !== id)); // Actualizar la lista de turnos después de eliminar
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/turnos/citas/editarTurno/${id}`); // Redirige a la página de edición
  };

  const turnosGrouped = groupByMonth(turnos);

  return (
    <div className="contenedor-verTurnos">
      <div className="padre-verTurnos">
        <div className="padre-titulo titulo">
          <h1>Ver Turnos</h1>
        </div>
        <div className="contenedor-listaTurnos">
          {isLoading ? (
            <div className="spinner"></div>
          ) : Object.keys(turnosGrouped).length > 0 ? (
            Object.keys(turnosGrouped).map((month) => (
              <div key={month}>
                <div
                  className={`titulo-mes ${openMonth === month ? "open" : ""}`}
                  onClick={() => handleMonthClick(month)}
                >
                  {month}
                </div>
                <div
                  className={`contenido-mes ${
                    openMonth === month ? "open" : ""
                  }`}
                >
                  <ul>
                    {turnosGrouped[month].map((turno) => (
                      <li key={turno.id}>
                        <p>
                          <span>Paciente:</span> {turno.nombre} {turno.apellido}
                        </p>
                        <p>
                          <span>Fecha:</span>{" "}
                          {new Date(turno.fecha).toLocaleDateString("es-ES", {
                            timeZone: "UTC",
                          })}
                        </p>
                        <p>
                          <span>Hora:</span> {turno.hora}
                        </p>
                        <p>
                          <span>Motivo:</span> {turno.motivo}
                        </p>
                        <div className="acciones-paciente">
                          <button onClick={() => handleEdit(turno.id)}>
                            Editar
                          </button>
                          <button
                            className="boton-borrar"
                            onClick={() => handleDelete(turno.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No hay turnos cargados.</p>
          )}
        </div>
        <NavLink to={`/turnos`}>
          <button className="boton-volver">Volver</button>
        </NavLink>
      </div>
    </div>
  );
};
