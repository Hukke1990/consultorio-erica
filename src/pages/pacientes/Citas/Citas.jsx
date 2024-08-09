import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import appFirebase from '../../../../src/credenciales';

const db = getFirestore(appFirebase);

export const Citas = () => {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pacientes'));
                const pacientesList = querySnapshot.docs.map(doc => doc.data());
                setPacientes(pacientesList);
            } catch (error) {
                console.error('Error al obtener los pacientes:', error);
            }
        };

        obtenerPacientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'turnos'), {
                nombre,
                apellido,
                fecha,
                hora,
                motivo,
            });
            alert('Turno registrado con éxito');
            // Limpiar el formulario
            setNombre('');
            setApellido('');
            setFecha('');
            setHora('');
            setMotivo('');
        } catch (error) {
            console.error('Error al registrar el turno:', error);
            alert('Hubo un error al registrar el turno');
        }
    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleApellidoChange = (e) => {
        setApellido(e.target.value);
    };

    const filteredNombres = pacientes.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    const filteredApellidos = pacientes.filter(p => p.apellido.toLowerCase().includes(apellido.toLowerCase()));

    return (
        <div className='contenedor-turnos'>
            <h1>Generar Turno</h1>
            <form onSubmit={handleSubmit} className='form-turnos'>
                <div className='campo'>
                    <label>Nombre</label>
                    <input
                        type='text'
                        value={nombre}
                        onChange={handleNombreChange}
                        list='nombres'
                        placeholder='Escriba o seleccione un nombre...'
                    />
                    <datalist id='nombres'>
                        {filteredNombres.map((paciente, index) => (
                            <option key={index} value={paciente.nombre} />
                        ))}
                    </datalist>
                </div>

                <div className='campo'>
                    <label>Apellido</label>
                    <input
                        type='text'
                        value={apellido}
                        onChange={handleApellidoChange}
                        list='apellidos'
                        placeholder='Escriba o seleccione un apellido...'
                    />
                    <datalist id='apellidos'>
                        {filteredApellidos.map((paciente, index) => (
                            <option key={index} value={paciente.apellido} />
                        ))}
                    </datalist>
                </div>

                <div className='campo'>
                    <label>Fecha</label>
                    <input
                        type='date'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>

                <div className='campo'>
                    <label>Hora</label>
                    <input
                        type='time'
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </div>

                <div className='campo'>
                    <label>Motivo</label>
                    <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder='Escriba el motivo del turno...'
                        required
                    ></textarea>
                </div>

                <button type='submit' className='btn-submit'>Registrar Turno</button>
            </form>
        </div>
    );
};
