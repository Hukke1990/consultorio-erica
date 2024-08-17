import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import appFirebase from '../../../../../src/credenciales';
import './EditarTurno.css';

export const db = getFirestore(appFirebase);

export const EditarTurno = () => {
    const { id } = useParams(); // Obtener el ID del turno desde los parámetros de la URL
    const navigate = useNavigate(); // Navegador para redirigir después de guardar
    const [turno, setTurno] = useState(null); // Estado para almacenar los datos del turno
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        const obtenerTurno = async () => {
            try {
                const docRef = doc(db, 'turnos', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTurno(docSnap.data()); // Almacena los datos del turno en el estado
                } else {
                    console.error('No se encontró el turno');
                }
            } catch (error) {
                console.error('Error al obtener el turno:', error);
            } finally {
                setIsLoading(false); // Finaliza la carga
            }
        };

        obtenerTurno();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTurno((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'turnos', id);
            await updateDoc(docRef, turno); // Actualiza los datos en la base de datos

            // Mostrar alerta de éxito
            alert('Cambios guardados con éxito.');

            // Redirigir después de 1000ms (1 segundo)
            setTimeout(() => {
                navigate('/turnos/citas/verTurnos');
            }, 1000);
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
    };

    return (
        <div className='contenedor-historial-clinico-paciente'>
            <div className='padre-editar-historial'>
                <div className='padre-titulo titulo'>
                    <h1>Editar Turno</h1>
                </div>
                <div className='contenedor-editar-historial editarHistorial'>
                    {isLoading ? (
                        <div className="spinner"></div> // Mostrar spinner mientras se cargan los datos
                    ) : turno ? (
                        <form onSubmit={handleSubmit}>
                            <div className="registros">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={turno.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registros">
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={turno.apellido}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registros">
                                <label>Fecha:</label>
                                <input
                                    type="date"
                                    name="fecha"
                                    value={turno.fecha}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registros">
                                <label>Hora:</label>
                                <input
                                    type="time"
                                    name="hora"
                                    value={turno.hora}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="registros">
                                <label>Motivo:</label>
                                <input
                                    type="text"
                                    name="motivo"
                                    value={turno.motivo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='acciones-editar-historial botones'>
                                <button type="submit" className='boton-registro'>Guardar</button>
                                <button type="button" className='boton-registro cancelar' onClick={() => navigate(`/turnos/citas/verTurnos`)}>Cancelar</button>
                            </div>                        </form>
                    ) : (
                        <p>No se encontraron datos para este turno.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
