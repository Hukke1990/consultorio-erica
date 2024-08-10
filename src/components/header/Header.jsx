import React from 'react'
import './Header.css'

export const Header = (correoUsuario) => {
    return (
        <div className='contenedor-header'>
            <h1>Bienvenido <span>{correoUsuario.correoUsuario}</span></h1>
        </div>
    )
}
