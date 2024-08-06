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
                    <li
                        className='dropdown'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span>Pacientes</span>
                        {dropdownOpen && (
                            <ul className='dropdown-menu'>
                                <li><NavLink to='/Pacientes/Registro'>Registro</NavLink></li>
                                <li><NavLink to='/Pacientes/Historial'>Historial</NavLink></li>
                                <li><NavLink to='/Pacientes/Citas'>Citas</NavLink></li>
                            </ul>
                        )}
                    </li>
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
