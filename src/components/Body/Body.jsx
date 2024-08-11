import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import appFirebase from '../../../src/credenciales';
import './Body.css';

const db = getFirestore(appFirebase);

export const Body = ({ uidUsuario }) => {
    const [turnosProximos, setTurnosProximos] = useState([]);

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
        const anio = fecha.getFullYear();

        return `${dia}-${mes}-${anio}`;
    };


    useEffect(() => {
        if (!uidUsuario) {
            console.error('UID del usuario no está definido');
            return;
        }

        const obtenerTurnosProximos = async () => {
            try {
                const hoy = new Date();
                const cincoDiasDespues = new Date();
                cincoDiasDespues.setDate(hoy.getDate() + 5);

                const hoyString = hoy.toISOString().split('T')[0];
                const cincoDiasDespuesString = cincoDiasDespues.toISOString().split('T')[0];

                console.log('Rango de fechas:', hoyString, cincoDiasDespuesString);
                console.log('UID del usuario:', uidUsuario);

                const turnosRef = collection(db, 'turnos');
                const q = query(
                    turnosRef,
                    where('fecha', '>=', hoyString),
                    where('fecha', '<=', cincoDiasDespuesString),
                    where('userId', '==', uidUsuario),
                    orderBy('fecha', 'asc') // Ordenar por fecha ascendente
                );

                const querySnapshot = await getDocs(q);
                const turnos = querySnapshot.docs.map(doc => doc.data());

                console.log('Turnos obtenidos:', turnos);

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
                    <div className='contenedor-noticias'>
                        <h2 className='padre-titulo'>Noticias y Recordatorios</h2>
                        <div className='padre-recordatorios'>
                            {turnosProximos.length > 0 ? (
                                turnosProximos.map((turno, index) => (
                                    <p key={index}>
                                        Consulta con <span>{turno.nombre} {turno.apellido}</span> el <span>{formatearFecha(turno.fecha)}</span> a las <span>{turno.hora}hs</span>
                                    </p>
                                ))
                            ) : (
                                <p>No hay consultas programadas para los próximos días.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
