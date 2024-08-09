import React from 'react';
import imagenAvatar from '../../../src/assets/logo-medicina.png';
import './MenuLateral.css';

export const MenuLateral = ({ correoUsuario, menuAbierto }) => {
    return (
        <div className={`contenedor-menuLateral ${menuAbierto ? 'abierto' : ''}`}>
            <div className='padre-menuLateral'>
                <div className='padre-imagen'>
                    <img src={imagenAvatar} alt="Logo Medicina" className='estilo-imagen' />
                </div>
                <h3>Opciones</h3>
                <p>Salir</p>
                <p>Ayuda</p>
                <p>Acerca de</p>
                <p>Contacto</p>
                <p>Noticias</p>
                <p>Recordatorios</p>
            </div>
        </div>
    );
};
