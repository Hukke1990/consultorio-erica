import React from "react";
import "./SelectorTiempo.css";

const SelectorTiempo = ({ hora, setHora, turnos, fecha }) => {
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutos = ["00", "30"];

  const getTurnoInfo = (horaSeleccionada) => {
    return turnos.find(
      (turno) => turno.fecha === fecha && turno.hora === horaSeleccionada
    );
  };

  const handleHoraChange = (e) => {
    setHora(e.target.value);
  };

  return (
    <div className="selector-tiempo">
      <select value={hora} onChange={handleHoraChange}>
        {horas.map((h) =>
          minutos.map((m) => {
            const horaCompleta = `${h}:${m}`;
            const turnoInfo = getTurnoInfo(horaCompleta);
            const ocupado = turnoInfo !== undefined;
            return (
              <option
                key={horaCompleta}
                value={horaCompleta}
                className={ocupado ? "ocupado" : ""}
              >
                {horaCompleta}
                {ocupado && ` - ${turnoInfo.nombre} ${turnoInfo.apellido}`}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
};

export default SelectorTiempo;
