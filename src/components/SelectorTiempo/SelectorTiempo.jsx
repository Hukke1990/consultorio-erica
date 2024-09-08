import React from "react";
import "./SelectorTiempo.css";

const SelectorTiempo = ({ hora, setHora, turnos, fecha }) => {
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutos = ["00", "30"];

  const isTurnoOcupado = (horaSeleccionada) => {
    return turnos.some(
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
            const ocupado = isTurnoOcupado(horaCompleta);
            return (
              <option
                key={horaCompleta}
                value={horaCompleta}
                className={ocupado ? "ocupado" : ""}
              >
                {horaCompleta}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
};

export default SelectorTiempo;
