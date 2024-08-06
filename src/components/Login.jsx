import React, { useState } from 'react'
import imagenFondo from '../assets/fondo.jpg'
import imagenAvatar from '../assets/logo-medicina.png'

import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(appFirebase)


export const Login = () => {


  const [registrando, setRegistrando] = useState(false)

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;

    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, password)
      } catch (error) {
        alert('Asegurese de que la contraseña sea de al menos 8 caracteres')
      }
    }
    else {
      try {
        await signInWithEmailAndPassword(auth, correo, password)
      } catch (error) {
        alert('Correo o contraseña incorrectos')
      }
    }
  }

  return (
    <div className='contenedor'>
      <div className="row">
        <div className="contenedor-login">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <img src={imagenAvatar} alt="" className='estilo-profile' />
              <form onSubmit={functAutenticacion}>
                <input type="text" placeholder='Email' className='cajatexto' id='email' />
                <input type="password" placeholder='Contraseña' className='cajatexto' id='password' />
                <button className='btnfrom'>{registrando ? 'Registrate' : 'Iniciar Sesion'}</button>
              </form>
              <h4 className='texto'>{registrando ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}<button className='btnswitch' onClick={() => setRegistrando(!registrando)}>{registrando ? 'Iniciar Sesion' : 'Registrate'}</button></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
