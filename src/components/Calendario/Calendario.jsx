import React, { useState } from "react";
import "./Calendario.css";

const Calendario = ({ fecha, setFecha, turnos }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate(); // Número de días en el mes actual
  };

  // Función para formatear la fecha en YYYY-MM-DD sin UTC
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isTurnoOcupado = (date) => {
    const formattedDate = formatDate(date); // Formateamos la fecha localmente
    return turnos.some((turno) => turno.fecha === formattedDate); // Comparación exacta
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setFecha(formatDate(selectedDate)); // Usamos el formato local
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = [];

    // Agregamos los días vacíos antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Renderizamos los días reales del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isOcupado = isTurnoOcupado(date); // Chequeamos si el turno está ocupado
      days.push(
        <div
          key={day}
          className={`day ${isOcupado ? "ocupado" : ""} ${
            fecha === formatDate(date) ? "selected" : ""
          }`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="calendario">
      <div className="header">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <div className="selectorMes">
          {currentDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
      <div className="days">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendario;
