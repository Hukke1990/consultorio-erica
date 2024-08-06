import React from 'react'
import appFirebase from '../credenciales'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(appFirebase)

export const Home = ({ correoUsuario }) => {

  return (
    <div className='container'>
      <p>Bienvenido, <strong>{correoUsuario}</strong> Has iniciado sesion </p>

      <button className='btnLogout' onClick={() => signOut(auth)}>
        Cerrar Sesion
      </button>

      <hr />

      <div className='row'>
        {/* esta seccion sera del formulario */}
        <div className='col-md-4'>
          <h3>Ingresar usuario</h3>
          <form>
            <div className="card card-body">
              <div className="form-group">
                <input type="text" name='nombre' className='form-control' placeholder='nombre' />

              </div>
            </div>
          </form>
        </div>
        {/* esta seccion sera la lista de nuestros usuarios */}
        <div className="col-md-8">

        </div>

      </div>
    </div>
  )
}
