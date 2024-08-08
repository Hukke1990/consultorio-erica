import React from 'react';
import { NavLink } from 'react-router-dom';
import './Body.css';

export const Body = () => {
    return (
        <div className='contenedor-body'>
            <div className='padre-body'>
                <h2>Noticias y Recordatorios</h2>

                <h3>Noticias</h3>
                <p>Nuevo estudio revela la efectividad de la telemedicina en la atención primaria</p>
                <p>Se inaugura nuevo centro de salud en la ciudad</p>
                <p>Campaña de vacunación contra la gripe comienza la próxima semana</p>
                <p>Conferencia sobre avances en cardiología este fin de semana</p>
                <p>Recordatorio: Actualización de software del sistema de administración el próximo lunes</p>
                <p>Tips para una alimentación saludable durante el verano</p>

                <h3>Recordatorios de Consultas</h3>
                <p>Consulta con el Dr. Pérez a las 10:00 AM</p>
                <p>Consulta con la Dra. Gómez a las 11:30 AM</p>
                <p>Consulta con el Dr. Martínez a las 1:00 PM</p>
            </div>
        </div>
    );
};
