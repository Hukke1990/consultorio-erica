import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../../../src/credenciales';
import './Diagnostico.css';

const db = getFirestore(appFirebase);

export const Diagnostico = () => {
    const [pacientes, setPacientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pacientes'));
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
    }, []);

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const handleSelectPaciente = (id) => {
        navigate(`/pacientes/diagnostico/diagnosticoPaciente/${id}`);
    };

    return (
        <div className='contenedor-diagnostico'>
            <div className='padre-diagnostico'>
                <div className='padre-titulo'>
                    <h1>Diagnostico</h1>
                </div>
                <div className='contenedor-pacientes-diagnostico'>
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
