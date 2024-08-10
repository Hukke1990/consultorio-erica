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
import { HistorialClinicoPaciente } from './pages/pacientes/historialClinico/historalClinicoPaciente/HistorialClinicoPaciente';
import { Citas } from './pages/pacientes/Citas/Citas';
import { GenerarCitas } from './pages/pacientes/Citas/GenerarCitas/GenerarCitas';
import { VerTurnos } from './pages/pacientes/Citas/verTurnos/VerTurnos';
import { DiagnosticoPaciente } from './pages/pacientes/diagnostico/diagnosticoPaciente/DiagnosticoPaciente';

import './App.css';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      console.log('Usuario Firebase:', usuarioFirebase); // Verifica aquí
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

  return (
    <div className='App'>
      {usuario && <Nav correoUsuario={usuario.email} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/registro" element={<Registro uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/diagnostico" element={<Diagnostico uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/historialClinico" element={<HistorialClinico uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/historialClinico/historalClinicoPaciente/:id" element={<HistorialClinicoPaciente uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/Citas" element={<Citas />} />
        <Route path="/pacientes/Citas/GenerarCitas" element={<GenerarCitas uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/Citas/verTurnos" element={<VerTurnos uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/diagnostico/diagnosticoPaciente/:id" element={<DiagnosticoPaciente uidUsuario={usuario?.uid} />} />
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
      {usuario && <Footer />}
    </div>
  );
}

export default App;
