import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import appFirebase from '../src/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Header } from './components/header/Header';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/login/Login';
import { Home } from './pages/home/Home';
import { Pacientes } from './pages/pacientes/Pacientes';
import { VerPacientes } from './pages/pacientes/verPacientes/VerPacientes';
import { EditarPaciente } from './pages/pacientes/verPacientes/editarPaciente/EditarPaciente';
import { Registro } from './pages/pacientes/registro/Registro';
import { Diagnostico } from './pages/pacientes/diagnostico/Diagnostico';
import { HistorialClinico } from './pages/pacientes/historialClinico/HistorialClinico';
import { HistorialClinicoPaciente } from './pages/pacientes/historialClinico/historalClinicoPaciente/HistorialClinicoPaciente';
import { EditarHistorialClinico } from './pages/pacientes/historialClinico/EditarHistorialClinico/EditarHistorialClinico';
import { Citas } from './pages/Turnos/Citas';
import { GenerarCitas } from './pages/Turnos/Citas/GenerarCitas/GenerarCitas';
import { VerTurnos } from './pages/Turnos/Citas/verTurnos/VerTurnos';
import { EditarTurno } from './pages/Turnos/Citas/EditarTurno/EditarTurno';
import { DiagnosticoPaciente } from './pages/pacientes/diagnostico/diagnosticoPaciente/DiagnosticoPaciente';
import { Administrador } from './pages/Administrador/Administrador';
import { RegistrarUsuario } from './pages/Administrador/RegistrarUsuario/RegistrarUsuario';
import { VerUsuarios } from './pages/Administrador/VerUsuarios/VerUsuarios';
import { Usuario } from './pages/Usuario/Usuario';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        const userDoc = doc(db, 'users', usuarioFirebase.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          // console.log('User Data:', userData);
          setIsAdmin(userData.role === 'admin');
          // console.log('Is Admin:', userData.role === 'admin');
        }
        if (window.location.pathname === '/login' || window.location.pathname === '/') {
          navigate('/home');
        }
      } else {
        setUsuario(null);
        setIsAdmin(false);
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [navigate]);


  return (
    <div className='App'>
      {usuario && <Header correoUsuario={usuario.email} />}
      {usuario && <Nav correoUsuario={usuario.email} isAdmin={isAdmin} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/registro" element={<Registro uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/verPacientes" element={<VerPacientes uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/verPacientes/editarPaciente/:id" element={<EditarPaciente uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/diagnostico" element={<Diagnostico uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/historialClinico" element={<HistorialClinico uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/historialClinico/historalClinicoPaciente/:id" element={<HistorialClinicoPaciente uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/historialClinico/editarHistorialClinico/:id/:docId" element={<EditarHistorialClinico uidUsuario={usuario?.uid} />} />
        <Route path='/turnos' element={<Citas />} />
        <Route path='/turnos/citas/generarCitas' element={<GenerarCitas uidUsuario={usuario?.uid} />} />
        <Route path='/turnos/citas/verTurnos' element={<VerTurnos uidUsuario={usuario?.uid} />} />
        <Route path='/turnos/citas/editarTurno/:id' element={<EditarTurno uidUsuario={usuario?.uid} />} />
        <Route path="/pacientes/diagnostico/diagnosticoPaciente/:id" element={<DiagnosticoPaciente uidUsuario={usuario?.uid} />} />
        <Route path="/administrador" element={<ProtectedRoute element={Administrador} isAdmin={isAdmin} />} />
        <Route path="/administrador/registrarUsuario" element={<ProtectedRoute element={RegistrarUsuario} isAdmin={isAdmin} />} />
        <Route path="/administrador/verUsuarios" element={<VerUsuarios />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="*" element={<Login />} /> {/* Ruta por defecto */}
      </Routes>
      {usuario && <Footer />}
    </div>
  );
}

export default App;
