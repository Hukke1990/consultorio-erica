import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import appFirebase from '../../../../credenciales';
import './GenerarCitas.css';

const db = getFirestore(appFirebase);

export const GenerarCitas = () => {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pacientes'));
                const pacientesList = querySnapshot.docs.map(doc => doc.data());
                setPacientes(pacientesList);
            } catch (error) {
                console.error('Error al obtener los pacientes:', error);
            }
        };

        obtenerPacientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'turnos'), {
                nombre,
                apellido,
                fecha,
                hora,
                motivo,
            });
            alert('Turno registrado con éxito');
            // Limpiar el formulario
            setNombre('');
            setApellido('');
            setFecha('');
            setHora('');
            setMotivo('');
        } catch (error) {
            console.error('Error al registrar el turno:', error);
            alert('Hubo un error al registrar el turno');
        }
    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleApellidoChange = (e) => {
        setApellido(e.target.value);
    };

    const filteredNombres = pacientes.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    const filteredApellidos = pacientes.filter(p => p.apellido.toLowerCase().includes(apellido.toLowerCase()));

    return (
        <div className='contenedor-turnos'>
            <div className='padre-GenerarTurnos'>
                <h1>Generar Turno</h1>
                <form onSubmit={handleSubmit} className='form-turnos'>
                    <fieldset className='fieldset-turnos'>
                        <div className='campo'>
                            <label>Nombre</label>
                            <input
                                type='text'
                                value={nombre}
                                onChange={handleNombreChange}
                                list='nombres'
                                placeholder='Escriba o seleccione un nombre...'
                                required
                            />
                            <datalist id='nombres'>
                                {filteredNombres.map((paciente, index) => (
                                    <option key={index} value={paciente.nombre} />
                                ))}
                            </datalist>
                        </div>

                        <div className='campo'>
                            <label>Apellido</label>
                            <input
                                type='text'
                                value={apellido}
                                onChange={handleApellidoChange}
                                list='apellidos'
                                placeholder='Escriba o seleccione un apellido...'
                                required
                            />
                            <datalist id='apellidos'>
                                {filteredApellidos.map((paciente, index) => (
                                    <option key={index} value={paciente.apellido} />
                                ))}
                            </datalist>
                        </div>

                        <div className='campo'>
                            <label>Fecha</label>
                            <input
                                type='date'
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>

                        <div className='campo'>
                            <label>Hora</label>
                            <input
                                type='time'
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                required
                            />
                        </div>

                        <div className='campo'>
                            <label>Motivo</label>
                            <textarea
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                placeholder='Escriba el motivo del turno...'
                                required
                            ></textarea>
                        </div>
                    </fieldset>
                    <div className='botones-registro'>
                        <button type='submit' className='btn-submit'>Registrar</button>
                        <button type="button" className='boton-registro cancelar'><NavLink to='/pacientes/Citas'>Cancelar</NavLink></button>
                    </div>
                </form>
            </div>
        </div>
    );
};
