import React from 'react';
import './home.css';
import { Body } from '../../components/Body/Body.jsx';
import { MenuLateral } from '../../components/MenuLateral/MenuLateral.jsx';

export const Home = () => {
  return (
    <div className='contenedor-home'>
      <MenuLateral />
      <Body />
    </div>
  );
}
