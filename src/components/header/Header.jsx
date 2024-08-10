import React from 'react'

export const Header = (correoUsuario) => {
    return (
        <div>
            <h1>Bienvenido <span>{correoUsuario.correoUsuario}</span></h1>
        </div>
    )
}
