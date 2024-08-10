import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import appFirebase from '../../../../../src/credenciales';
import './HistorialClinicoPaciente.css';

const db = getFirestore(appFirebase);

export const HistorialClinicoPaciente = ({ uidUsuario }) => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [historial, setHistorial] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPacienteYHistorial = async () => {
            try {
                const pacienteDoc = await getDoc(doc(db, 'pacientes', id));
                if (pacienteDoc.exists()) {
                    const dataPaciente = pacienteDoc.data();
                    if (dataPaciente.userId === uidUsuario) {
                        setPaciente(dataPaciente);

                        // Obtener los diagnósticos del paciente
                        const historialSnapshot = await getDocs(collection(db, `pacientes/${id}/diagnosticos`));
                        const historialList = historialSnapshot.docs.map(doc => doc.data());
                        setHistorial(historialList);
                    } else {
                        console.error('Acceso denegado: el usuario no tiene permisos para ver este paciente.');
                        navigate('/pacientes/historialClinico'); // Redirigir si el usuario no tiene permisos
                    }
                } else {
                    console.error('No se encontró el paciente');
                    navigate('/pacientes/historialClinico'); // Redirigir si no se encuentra el paciente
                }
            } catch (error) {
                console.error('Error al obtener el historial clínico:', error);
            }
        };

        obtenerPacienteYHistorial();
    }, [id, uidUsuario, navigate]);

    return (
        <div>
            {paciente && (
                <div className='contenedor-historial-clinico-paciente'>
                    <div className='padre-historial-clinico-paciente'>
                        <div className='padre-titulo'>
                            <h1>Historial Clínico</h1>
                        </div>
                        <div className='contenedor-historial-clinico-paciente'>
                            <h2>Historial de {paciente.nombre} {paciente.apellido}</h2>
                            <ul>
                                {historial.map((entrada, index) => (
                                    <li key={index}>
                                        <p><span>Fecha:</span> {entrada.fecha}</p>
                                        <p><span>Diagnóstico:</span> {entrada.diagnostico}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <NavLink to={`/pacientes/historialClinico`}>
                            <button className='boton-volver'>Volver</button>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};
