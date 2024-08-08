import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import appFirebase from '../src/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';

// Importar componentes
import { Login } from './components/login/Login';
import { Home } from './pages/home/Home';
import { Pacientes } from './pages/pacientes/Pacientes';
import { Registro } from './pages/pacientes/registro/Registro';
import { Diagnostico } from './pages/pacientes/diagnostico/Diagnostico';
import { HistorialClinico } from './pages/pacientes/historialClinico/HistorialClinico';
import { Citas } from './pages/pacientes/Citas/Citas';
import { DiagnosticoPaciente } from './pages/pacientes/diagnostico/diagnosticoPaciente/DiagnosticoPaciente'



import './App.css';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        if (window.location.pathname === '/login' || window.location.pathname === '/') {
          navigate('/home');
        }
      } else {
        setUsuario(null);
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [navigate]);

  console.log('usuario', usuario);

  return (
    <div className='App'>
      {usuario && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home correoUsuario={usuario?.email} />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/registro" element={<Registro />} />
        <Route path="/pacientes/diagnostico" element={<Diagnostico />} />
        <Route path="/pacientes/historialClinico" element={<HistorialClinico />} />
        <Route path="/pacientes/Citas" element={<Citas />} />
        <Route path="/pacientes/diagnostico/diagnosticoPaciente/:id" element={<DiagnosticoPaciente />} />
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
      {usuario && <Footer />}
    </div>
  );
}

export default App;
