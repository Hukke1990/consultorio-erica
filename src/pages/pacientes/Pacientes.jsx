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
                    <li><NavLink to='/'>Registro</NavLink></li>
                    <li><NavLink to='/'>Diagnostico</NavLink></li>
                    <li><NavLink to='/'>Historial Clinico</NavLink></li>
                    <li><NavLink to='/'>Citas</NavLink></li>
                </ul>

            </div>
        </div >
    )
}
