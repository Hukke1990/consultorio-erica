import React, { useState, useEffect } from "react";
import "./Calendario.css";

const Calendario = ({ fecha, setFecha, turnos }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const isTurnoOcupado = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return turnos.some((turno) => turno.fecha === formattedDate);
  };

  const handleDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setFecha(selectedDate.toISOString().split("T")[0]);
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

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isOcupado = isTurnoOcupado(date);
      days.push(
        <div
          key={day}
          className={`day ${isOcupado ? "ocupado" : ""} ${
            fecha === date.toISOString().split("T")[0] ? "selected" : ""
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
