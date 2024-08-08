import React from 'react'
import './Registro.css'
import { NavLink } from 'react-router-dom'

export const Registro = () => {
    return (
        <div className='contenedor-registro'>
            <div className='padre-registro'>
                <h1>Registrar paciente</h1>
                <form className='form-registro'>
                    <fieldset className='fieldset-registro'>
                        <div className='inputs-registro'>
                            <input type="text" placeholder='Nombre' />
                            <input type="text" placeholder='Apellido' />
                            <input type="text" placeholder='Fecha de nacimiento' />
                            <input type="text" placeholder='Sexo' />
                            <input type="text" placeholder='Obra Social' />
                            <input type="text" placeholder='Plan' />
                            <input type="text" placeholder='Carnet' />
                            <input type="text" placeholder='D.N.I' />
                            <input type="text" placeholder='Provincia' />
                            <input type="text" placeholder='Ciudad' />
                            <input type="text" placeholder='Direccion' />
                            <input type="text" placeholder='Telefono' />
                            <input type="email" placeholder='Email' />
                        </div>
                    </fieldset>
                    <div className='botones-registro'>
                        <button className='boton-registro'>Registrar</button>
                        <button className='boton-registro cancelar'><NavLink to='/pacientes'>Cancelar</NavLink></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

