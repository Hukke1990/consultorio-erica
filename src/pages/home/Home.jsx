import React from 'react';
import './home.css';
import { Nav } from '../../components/Nav/Nav.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';
import { Body } from '../../components/Body/Body.jsx';
import appFirebase from '../../../src/credenciales.js';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

export const Home = () => {
  return (
    <div>
      <Body />
    </div>
  );
}
