import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import appFirebase from '../../../../credenciales';
import './GenerarCitas.css';

const db = getFirestore(appFirebase);

export const GenerarCitas = ({ uidUsuario }) => {
    const [pacientes, setPacientes] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');
    const [turnoNoDisponible, setTurnoNoDisponible] = useState(false);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Obtener pacientes
                const querySnapshotPacientes = await getDocs(collection(db, 'pacientes'));
                const pacientesList = querySnapshotPacientes.docs
                    .map(doc => doc.data())
                    .filter(paciente => paciente.userId === uidUsuario);
                setPacientes(pacientesList);

                // Obtener turnos
                const querySnapshotTurnos = await getDocs(collection(db, 'turnos'));
                const turnosList = querySnapshotTurnos.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    .filter(turno => turno.userId === uidUsuario); // Filtrar turnos del usuario actual

                // Verificar si los turnos se están obteniendo correctamente
                console.log('Turnos obtenidos:', turnosList);

                setTurnos(turnosList);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
    }, [uidUsuario]);

    useEffect(() => {
        if (fecha && hora) {
            // Normalizar los datos de fecha y hora para la comparación
            const fechaSeleccionada = new Date(fecha).toISOString().split('T')[0];
            const horaSeleccionada = hora.padStart(5, '0');  // Asegura que la hora tenga el formato "HH:MM"

            // Verificar si el turno está ocupado
            const turnoOcupado = turnos.some(turno =>
                turno.fecha === fechaSeleccionada && turno.hora === horaSeleccionada
            );
            setTurnoNoDisponible(turnoOcupado);
            console.log(`Turno ocupado: ${turnoOcupado}`);
        }
    }, [fecha, hora, turnos]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (turnoNoDisponible) {
            alert('Este turno no está disponible.');
            return;
        }

        try {
            await addDoc(collection(db, 'turnos'), {
                userId: uidUsuario,
                nombre,
                apellido,
                fecha,
                hora,
                motivo,
            });
            alert('Turno registrado con éxito');
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
                <div className='padre-titulo titulo'>
                    <h1>Generar Turno</h1>
                </div>
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
                                name='fecha'
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                                style={{ borderColor: turnoNoDisponible ? 'red' : 'initial' }}
                            />
                        </div>
                        <div className='ocupado'>
                            <div className='campo'>
                                <label>Hora</label>
                                <input
                                    type='time'
                                    name='hora'
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                    required
                                    style={{ borderColor: turnoNoDisponible ? 'red' : 'initial' }}
                                />
                            </div>
                            {turnoNoDisponible && (
                                <p style={{ color: 'red', fontSize: '0.9rem' }}>
                                    Este turno ya está ocupado.
                                </p>
                            )}
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
