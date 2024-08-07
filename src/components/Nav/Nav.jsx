import React, { useState } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import appFirebase from '../../../src/credenciales.js';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

export const Nav = () => {

    return (
        <nav className='contenedor-nav'>
            <div className='nav'>
                <ul>
                    <li><NavLink to='/home'>Inicio</NavLink></li>
                    <li><NavLink to='/pacientes'>Pacientes</NavLink></li>
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
