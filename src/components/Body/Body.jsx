import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import appFirebase from '../../../src/credenciales';
import './Body.css';

const db = getFirestore(appFirebase);

export const Body = () => {
    const [turnosProximos, setTurnosProximos] = useState([]);

    useEffect(() => {
        const obtenerTurnosProximos = async () => {
            try {
                const hoy = new Date();
                const cincoDiasDespues = new Date();
                cincoDiasDespues.setDate(hoy.getDate() + 5);

                // Convertir las fechas a strings en formato 'yyyy-mm-dd' para Firebase
                const hoyString = hoy.toISOString().split('T')[0];
                const cincoDiasDespuesString = cincoDiasDespues.toISOString().split('T')[0];

                const turnosRef = collection(db, 'turnos');
                const q = query(turnosRef, where('fecha', '>=', hoyString), where('fecha', '<=', cincoDiasDespuesString));

                const querySnapshot = await getDocs(q);
                const turnos = querySnapshot.docs.map(doc => doc.data());

                setTurnosProximos(turnos);
            } catch (error) {
                console.error('Error al obtener los turnos próximos:', error);
            }
        };

        obtenerTurnosProximos();
    }, []);

    return (
        <div className='contenedor-body'>
            <div className='padre-body'>
                <h2 className='padre-titulo'>Noticias y Recordatorios</h2>

                {/* Otras secciones */}

                <h3>Recordatorios de Consultas</h3>
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
    );
};
