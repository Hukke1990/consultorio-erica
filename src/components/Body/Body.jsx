import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import appFirebase from '../../../src/credenciales';
import { MenuLateral } from '../MenuLateral/MenuLateral'; // Importar el componente del menú lateral
import './Body.css';

const db = getFirestore(appFirebase);

export const Body = () => {
    const [turnosProximos, setTurnosProximos] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(true); // Estado para manejar el menú lateral

    useEffect(() => {
        const obtenerTurnosProximos = async () => {
            try {
                const hoy = new Date();
                const cincoDiasDespues = new Date();
                cincoDiasDespues.setDate(hoy.getDate() + 5);

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

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto); // Alterna entre abrir y cerrar el menú
    };

    return (
        <div className='contenedor-body'>
            <div className='padre-body'>
                <MenuLateral menuAbierto={menuAbierto} />
                <div className="noMenuLateral">
                    <h2 className='padre-titulo'>Noticias y Recordatorios</h2>

                    <div className='contenedor-padre'>
                        <div className='padre-menu'>
                            <button className={`padre-menu-texto ${menuAbierto ? '' : 'rotar'}`} onClick={toggleMenu}>
                                <i className="bi bi-caret-left-fill"></i>
                            </button>
                        </div>

                        <div className='padre-recordatorios'>
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

                </div>
                {/* Pasamos el estado menuAbierto al componente MenuLateral */}
            </div>
        </div>
    );
};
