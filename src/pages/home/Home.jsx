import React from 'react';
import './home.css';
import { Body } from '../../components/Body/Body.jsx';

export const Home = ({ correoUsuario, uidUsuario }) => {
  return (
    <div className='contenedor-home'>
      <Body correoUsuario={correoUsuario} uidUsuario={uidUsuario} />
    </div>
  );
}
