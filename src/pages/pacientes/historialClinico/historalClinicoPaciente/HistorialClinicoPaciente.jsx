import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import appFirebase from '../../../../../src/credenciales';
import './HistorialClinicoPaciente.css';

const db = getFirestore(appFirebase);

export const HistorialClinicoPaciente = ({ uidUsuario }) => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevaEntrada, setNuevaEntrada] = useState({ fecha: '', diagnostico: '' });
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
                        const historialList = historialSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
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

    const handleEdit = (entrada) => {
        setEditando(entrada);
        setNuevaEntrada({ fecha: entrada.fecha, diagnostico: entrada.diagnostico });
    };

    const handleDelete = async (docId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta entrada del historial?')) {
            try {
                await deleteDoc(doc(db, `pacientes/${id}/diagnosticos`, docId));
                setHistorial(historial.filter(entrada => entrada.id !== docId));
            } catch (error) {
                console.error('Error al eliminar la entrada del historial:', error);
            }
        }
    };

    const handleSave = async () => {
        if (editando) {
            try {
                const docRef = doc(db, `pacientes/${id}/diagnosticos`, editando.id);
                await updateDoc(docRef, nuevaEntrada);
                setHistorial(historial.map(entrada =>
                    entrada.id === editando.id ? { ...entrada, ...nuevaEntrada } : entrada
                ));
                setEditando(null);
            } catch (error) {
                console.error('Error al actualizar la entrada del historial:', error);
            }
        }
    };

    const handleChange = (e) => {
        setNuevaEntrada({
            ...nuevaEntrada,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            {paciente && (
                <div className='contenedor-historial-clinico-paciente'>
                    <div className='padre-historial-clinico-paciente'>
                        <div className='padre-titulo titulo'>
                            <h1>Historial Clínico</h1>
                        </div>
                        <div className='contenedor-historial-clinico-paciente'>
                            <h2>Historial de {paciente.nombre} {paciente.apellido}</h2>
                            <ul>
                                {historial.map((entrada) => (
                                    <li key={entrada.id}>
                                        <p><span>Fecha:</span> {entrada.fecha}</p>
                                        <p><span>Diagnóstico:</span> {entrada.diagnostico}</p>
                                        <div className='acciones-paciente'>
                                            <button onClick={() => handleEdit(entrada)}>Editar</button>
                                            <button className='boton-borrar' onClick={() => handleDelete(entrada.id)}>Borrar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {editando && (
                                <div className='editar-entrada'>
                                    <h3>Editar Entrada</h3>
                                    <label>Fecha:</label>
                                    <input
                                        type="date"
                                        name="fecha"
                                        value={nuevaEntrada.fecha}
                                        onChange={handleChange}
                                    />
                                    <label>Diagnóstico:</label>
                                    <input
                                        type="text"
                                        name="diagnostico"
                                        value={nuevaEntrada.diagnostico}
                                        onChange={handleChange}
                                    />
                                    <button onClick={handleSave}>Guardar Cambios</button>
                                    <button onClick={() => setEditando(null)}>Cancelar</button>
                                </div>
                            )}
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
