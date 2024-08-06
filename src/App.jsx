import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import appFirebase from '../src/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';

// Importar componentes
import { Login } from './components/login/Login';
import { Home } from './pages/home/Home';

import './App.css';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        navigate('/home');
      } else {
        setUsuario(null);
        navigate('/login');
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [navigate, auth]);
  console.log('usuario', usuario);

  return (
    <div className='App'>
      {usuario && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home correoUsuario={usuario?.email} />} />
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
      {usuario && <Footer />}
    </div>
  );
}

export default App;