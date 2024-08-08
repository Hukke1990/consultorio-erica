import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import appFirebase from '../../../../../src/credenciales';
import './DiagnosticoPaciente.css';

const db = getFirestore(appFirebase);

export const DiagnosticoPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [diagnostico, setDiagnostico] = useState('');

    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                const pacienteDoc = await getDoc(doc(db, 'pacientes', id));
                if (pacienteDoc.exists()) {
                    setPaciente(pacienteDoc.data());
                } else {
                    console.error('No se encontró el paciente');
                }
            } catch (error) {
                console.error('Error al obtener el paciente:', error);
            }
        };

        obtenerPaciente();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'diagnosticos', id), {
                diagnostico,
                fecha: new Date().toLocaleDateString(),
            });
            alert('Diagnóstico registrado con éxito');
        } catch (error) {
            console.error('Error al registrar el diagnóstico:', error);
            alert('Hubo un error al registrar el diagnóstico');
        }
    };

    return (
        <div className='contenedor-diagnostico'>
            {paciente && (
                <>
                    <h1>Diagnóstico para {paciente.nombre} {paciente.apellido}</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={diagnostico}
                            onChange={(e) => setDiagnostico(e.target.value)}
                            placeholder="Escriba el diagnóstico aquí..."
                        ></textarea>
                        <button type="submit">Registrar Diagnóstico</button>
                    </form>
                </>
            )}
        </div>
    );
};
