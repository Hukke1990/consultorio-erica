import React from 'react';
import imagenAvatar from '../../../src/assets/logo-medicina.png';
import './MenuLateral.css';
import { NavLink } from 'react-router-dom';
import appFirebase from '../../../src/credenciales.js';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

export const MenuLateral = ({ correoUsuario, menuAbierto }) => {
    return (
        <div className={`contenedor-menuLateral ${menuAbierto ? 'abierto' : ''}`}>
            <div className='padre-menuLateral'>
                <div className='padre-imagen'>
                    <img src={imagenAvatar} alt="Logo Medicina" className='estilo-imagen' />
                    <h3>test@gmail.com</h3>
                    <ul>
                        <li><NavLink to='/home'>Cambiar contraseña</NavLink></li>
                        <li><NavLink to='/'>Contactenos (Proximamente)</NavLink></li>
                    </ul>
                </div>
                <div>
                    <button className='btnSignOut' onClick={() => signOut(auth)}>
                        <NavLink to='/Login'>Cerrar Sesión</NavLink>
                    </button>
                </div>
            </div>
        </div>
    );
};