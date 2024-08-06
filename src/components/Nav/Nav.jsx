import React, { useState } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import appFirebase from '../../../src/credenciales.js';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

export const Nav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    return (
        <nav className='contenedor-nav'>
            <div className='nav'>
                <ul>
                    <li><NavLink exact to='/'>Inicio</NavLink></li>
                    <li><NavLink to='/Pacientes/Registro'>Pacientes</NavLink></li>
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
