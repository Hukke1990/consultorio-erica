import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../../../../../src/credenciales';
import './VerTurnos.css';

const db = getFirestore(appFirebase);

export const VerTurnos = ({ uidUsuario }) => {
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el spinner

    useEffect(() => {
        const obtenerTurnos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'turnos'));
                const turnosList = querySnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    .filter(turno => turno.userId === uidUsuario); // Filtrar turnos del usuario actual
                setTurnos(turnosList);
            } catch (error) {
                console.error('Error al obtener los turnos:', error);
            } finally {
                setIsLoading(false); // Ocultar el spinner cuando los datos se hayan cargado
            }
        };

        obtenerTurnos();
    }, [uidUsuario]);

    return (
        <div className="contenedor-verTurnos">
            <div className='padre-verTurnos'>
                <div className='padre-titulo titulo'>
                    <h1>Ver Turnos</h1>
                </div>
                <div className='contenedor-listaTurnos'>
                    {isLoading ? ( // Mostrar el spinner mientras carga
                        <div className="spinner"></div>
                    ) : turnos.length > 0 ? (
                        <ul>
                            {turnos.map((turno) => (
                                <li key={turno.id}>
                                    <p><span>Paciente:</span> {turno.nombre} {turno.apellido}</p>
                                    <p><span>Fecha:</span> {new Date(turno.fecha).toLocaleDateString()}</p>
                                    <p><span>Hora:</span> {turno.hora}</p>
                                    <p><span>Motivo:</span> {turno.motivo}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay turnos cargados.</p>
                    )}
                </div>
                <NavLink to={`/turnos`}>
                    <button className='boton-volver'>Volver</button>
                </NavLink>
            </div>
        </div>
    );
};
