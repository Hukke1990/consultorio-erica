import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import appFirebase from '../../../src/credenciales';
import './Body.css';

const db = getFirestore(appFirebase);

export const Body = ({ uidUsuario }) => {
    const [turnosProximos, setTurnosProximos] = useState([]);

    useEffect(() => {
        const obtenerTurnosProximos = async () => {
            try {
                const hoy = new Date();
                const cincoDiasDespues = new Date();
                cincoDiasDespues.setDate(hoy.getDate() + 5);

                const hoyString = hoy.toISOString().split('T')[0];
                const cincoDiasDespuesString = cincoDiasDespues.toISOString().split('T')[0];

                const turnosRef = collection(db, 'turnos');
                const q = query(
                    turnosRef,
                    where('fecha', '>=', hoyString),
                    where('fecha', '<=', cincoDiasDespuesString),
                    where('userId', '==', uidUsuario)  // Filtrar por el ID del usuario
                );

                const querySnapshot = await getDocs(q);
                const turnos = querySnapshot.docs.map(doc => doc.data());

                setTurnosProximos(turnos);
            } catch (error) {
                console.error('Error al obtener los turnos próximos:', error);
            }
        };

        obtenerTurnosProximos();
    }, [uidUsuario]);

    return (
        <div className='contenedor-body'>
            <div className='padre-body'>
                <div className="noMenuLateral">
                    <h2 className='padre-titulo'>Noticias y Recordatorios</h2>
                    <div className='padre-recordatorios'>
                        {turnosProximos.length > 0 ? (
                            turnosProximos.map((turno, index) => (
                                <p key={index}>
                                    Consulta con <span>{turno.nombre} {turno.apellido}</span> el <span>{turno.fecha}</span> a las <span>{turno.hora}</span>
                                </p>
                            ))
                        ) : (
                            <p>No hay consultas programadas para los próximos días.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
