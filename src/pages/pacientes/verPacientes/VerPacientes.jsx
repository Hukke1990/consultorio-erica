import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../../../../src/credenciales';
import './VerPacientes.css';

const db = getFirestore(appFirebase);

export const VerPacientes = ({ uidUsuario }) => {
    const [pacientes, setPacientes] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroApellido, setFiltroApellido] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const pacientesRef = collection(db, 'pacientes');
                let q = query(pacientesRef, where('uidUsuario', '==', uidUsuario));

                if (filtroNombre.trim() !== '' || filtroApellido.trim() !== '') {
                    const condiciones = [];
                    if (filtroNombre.trim() !== '') {
                        condiciones.push(where('nombre', '>=', filtroNombre));
                        condiciones.push(where('nombre', '<=', filtroNombre + '\uf8ff'));
                    }
                    if (filtroApellido.trim() !== '') {
                        condiciones.push(where('apellido', '>=', filtroApellido));
                        condiciones.push(where('apellido', '<=', filtroApellido + '\uf8ff'));
                    }
                    q = query(pacientesRef, where('uidUsuario', '==', uidUsuario), ...condiciones);
                }

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
    }, [filtroNombre, filtroApellido, uidUsuario]);

    const editarPaciente = (id) => {
        navigate(`/pacientes/verPacientes/editarPaciente/${id}`);
    };

    const borrarPaciente = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
            try {
                await deleteDoc(doc(db, 'pacientes', id));
                setPacientes(pacientes.filter(paciente => paciente.id !== id));
            } catch (error) {
                console.error('Error al eliminar el paciente:', error);
            }
        }
    };

    return (
        <div className='contenedor-pacientes'>
            <div className='padre-pacientes'>
                <div className='padre-titulo'>
                    <h1>Ver Pacientes</h1>
                </div>

                <div className='filtros'>
                    <h3>Buscar pacientes</h3>
                    <div className='contenedor-filtros'>
                        <div className='filtro-input'>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                placeholder="Filtrar por nombre"
                                value={filtroNombre}
                                onChange={(e) => setFiltroNombre(e.target.value)}
                            />
                        </div>
                        <div className='filtro-input'>
                            <label>Apellido:</label>
                            <input
                                type="text"
                                placeholder="Filtrar por apellido"
                                value={filtroApellido}
                                onChange={(e) => setFiltroApellido(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='lista-pacientes'>
                    {pacientes.length > 0 ? (
                        pacientes.map((paciente) => (
                            <div key={paciente.id} className='filtro-paciente paciente'>
                                <ul>
                                    <li><strong>Nombre:</strong> <span>{paciente.nombre}</span></li>
                                    <li><strong>Apellido:</strong> <span>{paciente.apellido}</span></li>
                                    <li><strong>DNI:</strong> <span>{paciente.dni}</span></li>
                                </ul>
                                <div className='acciones-paciente'>
                                    <button onClick={() => editarPaciente(paciente.id)}>Editar</button>
                                    <button className='boton-borrar' onClick={() => borrarPaciente(paciente.id)}>Borrar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron pacientes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
