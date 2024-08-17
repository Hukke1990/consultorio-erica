import React from 'react'
import './Pacientes.css'
import { NavLink } from 'react-router-dom'

export const Pacientes = () => {
    return (
        <div className='contenedor-pacientes'>
            <div className='padre-pacientes'>
                <div className='padre-titulo titulo'>
                    <h1>Pacientes</h1>
                </div>

                <div className='contenedor-opcionesPacientes'>
                    <ul>
                        <li><NavLink to='/pacientes/registro'>Registro</NavLink></li>
                        <li><NavLink to='/pacientes/verPacientes'>Ver pacientes</NavLink></li>
                        <li><NavLink to='/pacientes/diagnostico'>Diagnostico</NavLink></li>
                        <li><NavLink to='/pacientes/historialClinico'>Historial Clinico</NavLink></li>
                    </ul>
                </div>

            </div>
        </div >
    )
}
