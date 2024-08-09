import React from 'react'
import './Pacientes.css'
import { NavLink } from 'react-router-dom'

export const Pacientes = () => {
    return (
        <div className='contenedor-pacientes'>
            <div className='padre-pacientes'>
                <div className='padre-titulo'>
                    <h1>Pacientes</h1>
                </div>

                <ul>
                    <li><NavLink to='/pacientes/registro'>Registro</NavLink></li>
                    <li><NavLink to='/pacientes/diagnostico'>Diagnostico</NavLink></li>
                    <li><NavLink to='/pacientes/historialClinico'>Historial Clinico</NavLink></li>
                    <li><NavLink to='/pacientes/Citas'>Turnos</NavLink></li>
                </ul>

            </div>
        </div >
    )
}
