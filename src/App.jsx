import { useState } from 'react';

// Importando los modulos de firebase
import appFirebase from '../src/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(appFirebase);

// Importar nuestros componentes
import { Login } from './components/login/Login';
import { Home } from './pages/home/Home';

import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <div className='App'>
      {usuario ? <Home correoUsuario={usuario.email} /> : <Login />}
    </div>
  );
}

export default App;
