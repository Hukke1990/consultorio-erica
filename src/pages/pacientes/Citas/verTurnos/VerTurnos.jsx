import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../../../../../src/credenciales';
import './VerTurnos.css';

const db = getFirestore(appFirebase);

export const VerTurnos = () => {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        const obtenerTurnos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'turnos'));
                const turnosList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTurnos(turnosList);
            } catch (error) {
                console.error('Error al obtener los turnos:', error);
            }
        };

        obtenerTurnos();
    }, []);

    return (
        <div className="contenedor-verTurnos">
            <div className='padre-verTurnos'>
                <h1>Ver Turnos</h1>
                <div className='contenedor-listaTurnos'>
                    {turnos.length > 0 ? (
                        <ul>
                            {turnos.map((turno) => (
                                <li key={turno.id}>
                                    <p><strong>Paciente:</strong> {turno.nombre} {turno.apellido}</p>
                                    <p><strong>Fecha:</strong> {new Date(turno.fecha).toLocaleDateString()}</p>
                                    <p><strong>Hora:</strong> {turno.hora}</p>
                                    <p><strong>Motivo:</strong> {turno.motivo}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay turnos cargados.</p>
                    )}
                </div>
                <NavLink to={`/pacientes/Citas`}>
                    <button className='boton-volver'>Volver</button>
                </NavLink>

            </div>
        </div>
    );
}
