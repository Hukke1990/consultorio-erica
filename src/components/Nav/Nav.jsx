import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import appFirebase from '../../../src/credenciales.js';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

export const Nav = ({ correoUsuario }) => {
    return (
        <nav className='contenedor-nav nav'>
            <div className='padre-nav'>
                <ul>
                    {/* <li><p>Bienvenido {correoUsuario}</p></li> */}
                    <li><NavLink exact to='/home' activeClassName='active'>Inicio</NavLink></li>
                    <li><NavLink to='/pacientes' activeClassName='active'>Pacientes</NavLink></li>
                    <li>
                        <button className='btnSignOut' onClick={() => signOut(auth)}>
                            <NavLink to='/Login'>Cerrar Sesión</NavLink>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
