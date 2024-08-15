import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import appFirebase from '../../../../../src/credenciales';
import './EditarHistorialClinico.css';

const db = getFirestore(appFirebase);

export const EditarHistorialClinico = ({ uidUsuario }) => {
    const { id, docId } = useParams();
    const [entrada, setEntrada] = useState({ fecha: '', diagnostico: '' });
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ID del paciente:", id);
        console.log("ID del diagnóstico:", docId);
        const obtenerEntrada = async () => {
            try {
                const entradaDoc = await getDoc(doc(db, `pacientes/${id}/diagnosticos`, docId));
                if (entradaDoc.exists()) {
                    const dataEntrada = entradaDoc.data();

                    // Verificar si el usuario autenticado tiene permiso para editar
                    if (dataEntrada.userId !== uidUsuario) {
                        console.error('No tienes permiso para editar esta entrada');
                        navigate(`/pacientes/historialClinico/${id}`);
                        return;
                    }

                    setEntrada(dataEntrada);
                } else {
                    console.error('No se encontró la entrada del historial');
                    navigate(`/pacientes/historialClinico/${id}`);
                }
            } catch (error) {
                console.error('Error al obtener la entrada del historial:', error);
            }
        };

        obtenerEntrada();
    }, [id, docId, navigate, uidUsuario]);


    const handleChange = (e) => {
        setEntrada({
            ...entrada,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!id || !docId) {
                throw new Error("El ID del paciente o el ID del diagnóstico no están definidos.");
            }

            const docRef = doc(db, `pacientes/${id}/diagnosticos`, docId);
            await updateDoc(docRef, {
                ...entrada,
                lastUpdatedBy: uidUsuario, // Registrar quién realizó la última actualización
                lastUpdated: new Date() // Registrar la fecha de la última actualización
            });
            alert('Entrada actualizada con éxito');

            // Redirigir después de 1000 ms
            setTimeout(() => {
                navigate(`/pacientes/historialClinico/historalClinicoPaciente/${id}`);
            }, 1000);
        } catch (error) {
            console.error('Error al actualizar la entrada del historial:', error);
            alert('Hubo un error al actualizar la entrada');
        }
    };


    return (
        <div className='contenedor-historial-clinico-paciente'>
            <div className='padre-editar-historial'>
                <div className='padre-titulo titulo'>
                    <h1>Editar Historial Clínico</h1>
                </div>
                <div className='contenedor-editar-historial editarHistorial'>
                    <form onSubmit={handleSave}>
                        <div className='registros'>
                            <label htmlFor="fecha">Fecha:</label>
                            <input
                                type="text"
                                name="fecha"
                                value={entrada.fecha}
                                placeholder={entrada.fecha || "DD-MM-AAAA"}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='registros textarea'>
                            <label htmlFor="diagnostico">Diagnóstico</label>
                            <textarea
                                name="diagnostico"
                                value={entrada.diagnostico}
                                placeholder={entrada.diagnostico || "Diagnóstico"}
                                onChange={handleChange}
                                required
                            />

                            <div className='acciones-editar-historial botones'>
                                <button type="submit" className='boton-registro'>Guardar</button>
                                <button type="button" className='boton-registro cancelar' onClick={() => navigate(`/pacientes/historialClinico/historalClinicoPaciente/${id}`)}>Cancelar</button>
                            </div>
                        </div>

                    </form>
                    <div className='contenedor-volver'>
                        <NavLink to={`/pacientes/historialClinico/historalClinicoPaciente/${id}`}>
                            <button className='boton-volver'>Volver</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
