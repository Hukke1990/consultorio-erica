import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../../../src/credenciales';
import './HistorialClinico.css';

const db = getFirestore(appFirebase);

export const HistorialClinico = ({ uidUsuario }) => {
    const [pacientes, setPacientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                // Filtrar pacientes por el ID del usuario autenticado
                const q = query(collection(db, 'pacientes'), where('userId', '==', uidUsuario));
                const querySnapshot = await getDocs(q);
                const pacientesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPacientes(pacientesList);
            } catch (error) {
                console.error('Error al obtener los pacientes:', error);
            }
        };

        obtenerPacientes();
    }, [uidUsuario]);

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const handleSelectPaciente = (id) => {
        navigate(`/pacientes/historialClinico/historalClinicoPaciente/${id}`);
    };

    return (
        <div className='contenedor-historial-clinico'>
            <div className='padre-historial-clinico'>
                <div className='padre-titulo'>
                    <h1>Historial Clínico</h1>
                </div>
                <div className='contenedor-pacientes-historial-clinico'>
                    <h2>Pacientes</h2>
                    <ul>
                        {pacientes.map((paciente) => (
                            <li key={paciente.id} onClick={() => handleSelectPaciente(paciente.id)}>
                                {capitalize(paciente.nombre)} {capitalize(paciente.apellido)}
                            </li>
                        ))}
                    </ul>
                </div>
                <NavLink to={`/pacientes`}>
                    <button className='boton-volver'>Volver</button>
                </NavLink>
            </div>
        </div>
    );
};
