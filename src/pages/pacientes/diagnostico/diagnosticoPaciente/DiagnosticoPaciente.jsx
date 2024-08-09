import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import appFirebase from '../../../../../src/credenciales';
import './DiagnosticoPaciente.css';

const db = getFirestore(appFirebase);

export const DiagnosticoPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [diagnostico, setDiagnostico] = useState('');

    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                const pacienteDoc = await getDoc(doc(db, 'pacientes', id));
                if (pacienteDoc.exists()) {
                    const dataPaciente = pacienteDoc.data();
                    const edad = calcularEdad(dataPaciente.fechaNacimiento);
                    setPaciente({ ...dataPaciente, edad });
                } else {
                    console.error('No se encontró el paciente');
                }
            } catch (error) {
                console.error('Error al obtener el paciente:', error);
            }
        };

        obtenerPaciente();
    }, [id]);

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Guardar diagnóstico en la subcolección "diagnosticos" dentro del documento del paciente
            const diagnosticosCollection = collection(db, `pacientes/${id}/diagnosticos`);
            await addDoc(diagnosticosCollection, {
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
        <div className='contenedor-diagnosticoPaciente'>
            <div className='padre-diagnosticoPaciente'>
                {paciente && (
                    <>
                        <h1>Diagnostico</h1>
                        <div className='datosPacientes'>
                            <p><span>Fecha de registro:</span> {new Date().toLocaleDateString()}</p>
                            <p><span>Nombre:</span> {capitalize(paciente.nombre)}</p>
                            <p><span>Apellido:</span> {capitalize(paciente.apellido)}</p>
                            <p><span>DNI:</span> {paciente.dni}</p>
                            <p><span>Edad:</span> {paciente.edad} años</p>
                        </div>

                        <div className='contenedor-formDiagnostico'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="diagnostico">Diagnóstico</label>
                                <textarea
                                    value={diagnostico}
                                    onChange={(e) => setDiagnostico(e.target.value)}
                                    placeholder="Escriba el diagnóstico aquí..."
                                ></textarea>
                                <div className='botones-registro'>
                                    <button className='boton-registro' type="submit">Guardar</button>
                                    <button className='boton-registro cancelar' type="button"><NavLink to='/pacientes/diagnostico'>Cancelar</NavLink></button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
