import React from 'react'
import imagenAvatar from '../../../src/assets/logo-medicina.png'
import './MenuLateral.css'

export const MenuLateral = () => {
    return (
        <div className='contenedor-menuLateral'>
            <div className='padre-menuLateral'>
                <div className='padre-imagen'>
                    <img src={imagenAvatar} alt="" className='estilo-imagen' />
                </div>
                <h3>opciones</h3>
                <p>salir</p>
                <p>ayuda</p>
                <p>acerca de</p>
                <p>contacto</p>
                <p>noticias</p>
                <p>recordatorios</p>
            </div>
        </div>
    )
}

