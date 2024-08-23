import React, { useState } from 'react';
import './Administrador.css';
import { NavLink } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const Administrador = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Default role
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            // Crear el nuevo usuario
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Agregar usuario a la colección 'users' en Firestore
            await addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid,
                email: email,
                role: role
            });

            // Mostrar mensaje de éxito
            setMessage(`El usuario con correo ${email} ha sido creado exitosamente.`);

            // Limpiar campos
            setEmail('');
            setPassword('');
            setRole('usuario');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setMessage('Error al crear el usuario. Inténtalo de nuevo.');
        }
    };

    return (
        <div className='contenedor-registro'>
            <div className='padre-registro'>
                <h1>Registrar Usuario</h1>
                <form className='form-registro'>
                    <fieldset className='fieldset-registro'>
                        <div className='inputs-registro'>
                            <div className='registros' >
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="contrasenia">Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="sexo">Tipo usuario:</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Seleccionar tipo usuario</option>
                                    <option value="admin">Administrador</option>
                                    <option value="usuario">Usuario</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className='botones-registro'>
                    <button onClick={handleRegister} className='boton-registro'>Registrar</button>
                    <NavLink to='/pacientes'><button type="button" className='boton-registro cancelar'>Cancelar</button></NavLink>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};
