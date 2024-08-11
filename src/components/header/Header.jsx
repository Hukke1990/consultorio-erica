import React from 'react'
import './Header.css'

export const Header = (correoUsuario) => {
    return (
        <div className='contenedor-header'>
            <h1><span>Bienvenido</span> {correoUsuario.correoUsuario}</h1>
        </div>
    )
}
