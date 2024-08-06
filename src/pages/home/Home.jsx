import React from 'react';
import './home.css';
import { Nav } from '../../components/Nav/Nav.jsx';
import appFirebase from '../../../src/credenciales.js';
import { getAuth, signOut } from 'firebase/auth';
import avatarLogo from '../../../src/assets/logo-medicina.png';

const auth = getAuth(appFirebase);

export const Home = ({ correoUsuario }) => {
  return (
    <div className='fondo'>
      <div className='contenedor-general'>
        <div className="contenedor-home">
          <img src={avatarLogo} alt="" className='estilo-profile logo-home' />
          <p className='text-bienvenida'>
            Bienvenido, <strong>{correoUsuario}</strong>
          </p>
          <Nav />
          <h2>Home</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptatum molestiae atque perspiciatis quidem, cumque est tempora voluptatem fugit omnis magni impedit, neque sapiente quaerat ut quae. Repellendus, ea explicabo.</p>
        </div>
      </div>
    </div>
  );
}
