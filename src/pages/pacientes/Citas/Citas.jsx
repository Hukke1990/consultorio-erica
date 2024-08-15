import React from 'react';
import { NavLink } from 'react-router-dom';
import './Citas.css';

export const Citas = () => {
    return (
        <div className='contenedor-turnos'>
            <div className='padre-turnos'>
                <div className='padre-titulo titulo'>
                    <h1>Turnos</h1>
                </div>
                <ul>
                    <li><NavLink to='/pacientes/citas/generarCitas'>Generar Turnos</NavLink></li>
                    <li><NavLink to='/pacientes/citas/verTurnos'>Ver Turnos</NavLink></li>
                </ul>
                <div className='contenedor-volver'>
                    <NavLink to={`/pacientes`}>
                        <button className='boton-volver'>Volver</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
