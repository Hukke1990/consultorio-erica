import React from 'react';
import './home.css';
import { Body } from '../../components/Body/Body.jsx';

export const Home = ({ uidUsuario }) => {
  return (
    <div className='contenedor-home'>
      <Body uidUsuario={uidUsuario} />
    </div>
  );
};
