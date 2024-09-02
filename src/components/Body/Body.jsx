import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import appFirebase from "../../../src/credenciales";
import "./Body.css";

const db = getFirestore(appFirebase);

export const Body = ({ uidUsuario }) => {
  const [turnosProximos, setTurnosProximos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para el spinner

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();

    return `${dia}-${mes}-${anio}`;
  };

  useEffect(() => {
    if (!uidUsuario) {
      console.error("UID del usuario no está definido");
      return;
    }

    const obtenerTurnosProximos = async () => {
      setIsLoading(true); // Inicia la carga

      try {
        const hoy = new Date();
        const cincoDiasDespues = new Date();
        cincoDiasDespues.setDate(hoy.getDate() + 5);

        const hoyString = hoy.toISOString().split("T")[0];
        const cincoDiasDespuesString = cincoDiasDespues
          .toISOString()
          .split("T")[0];

        console.log("Rango de fechas:", hoyString, cincoDiasDespuesString);
        console.log("UID del usuario:", uidUsuario);

        const turnosRef = collection(db, "turnos");
        const q = query(
          turnosRef,
          where("fecha", ">=", hoyString),
          where("fecha", "<=", cincoDiasDespuesString),
          where("userId", "==", uidUsuario),
          orderBy("fecha", "asc") // Ordenar por fecha ascendente
        );

        const querySnapshot = await getDocs(q);
        const turnos = querySnapshot.docs.map((doc) => doc.data());

        console.log("Turnos obtenidos:", turnos);

        setTurnosProximos(turnos);
      } catch (error) {
        console.error("Error al obtener los turnos próximos:", error);
      } finally {
        setIsLoading(false); // Termina la carga
      }
    };

    obtenerTurnosProximos();
  }, [uidUsuario]);

  return (
    <div className="contenedor-body">
      <div className="padre-body">
        <div className="padre-editar-historial">
          <div className="contenedor-noticias">
            <div className="padre-titulo titulo">
              <h1>Noticias y Recordatorios</h1>
            </div>
            <div className="padre-recordatorios">
              <h3>Noticias y novedades:</h3>
              <div className="turnosProximos">
                <ul>
                  <li className="noticias">
                    Ahora se permite editar/eliminar los turnos (Nuevo)
                  </li>
                  <li className="noticias">
                    Ahora se permite editar/eliminar el Historial clinico de
                    cada paciente (Nuevo)
                  </li>
                  <li className="noticias">
                    Se agrego la opcion de generar un QR para que el paciente
                    pueda escanear y asi registrar el turno en su telefono mobil
                    (opcion de pago) (Nuevo)
                  </li>
                </ul>
              </div>
              <h3>Recordatorio de turnos:</h3>
              {isLoading ? (
                <div className="spinner"></div> // Mostrar spinner mientras se cargan los turnos
              ) : turnosProximos.length > 0 ? (
                turnosProximos.map((turno, index) => (
                  <div className="turnosProximos">
                    <ul>
                      <li key={index}>
                        Consulta con{" "}
                        <span>
                          {turno.nombre} {turno.apellido}
                        </span>{" "}
                        el <span>{formatearFecha(turno.fecha)}</span> a las{" "}
                        <span>{turno.hora}hs</span>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No hay consultas programadas para los próximos días.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
