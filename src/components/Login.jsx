import React from 'react'
import imagenFondo from '../assets/fondo.jpg'
import imagenAvatar from '../assets/avatar.png'



export const Login = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body">
              <img src={imagenAvatar} alt="" className='estilo-profile' />
              <form>
                <input type="text" placeholder='Ingresar Email' className='cajatexto' />
                <input type="pass" placeholder='Ingresar Contraseña' className='cajatexto' />
                <button className='btnfrom'>registrarse</button>
              </form>
              <h4><button>Ingresar</button></h4>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <img src={imagenFondo} alt="" className='tamanio-imagen' />
        </div>
      </div>
    </div>
  )
}
