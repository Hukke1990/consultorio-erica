import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import appFirebase from '../../../../../src/credenciales';
import './EditarPaciente.css';

const db = getFirestore(appFirebase);

export const EditarPaciente = () => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        sexo: '',
        obraSocial: '',
        plan: '',
        carnet: '',
        dni: '',
        provincia: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        email: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                const docRef = doc(db, 'pacientes', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormValues(docSnap.data());
                } else {
                    console.log("No se encontró el paciente");
                }
            } catch (error) {
                console.error("Error al obtener el paciente:", error);
            }
        };

        obtenerPaciente();
    }, [id]);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = doc(db, 'pacientes', id);
            await updateDoc(docRef, formValues);
            navigate('/pacientes'); // Navega de vuelta a la lista de pacientes
        } catch (error) {
            console.error("Error al actualizar el paciente:", error);
        }
    };

    return (
        <div className='contenedor-registro'>
            <div className='padre-registro'>
                <h1>Editar Paciente</h1>
                <form className='form-registro' onSubmit={handleSubmit}>
                    <fieldset className='fieldset-registro'>
                        <div className='inputs-registro'>
                            <div className='registros'>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formValues.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros'>
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formValues.apellido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    placeholder='Fecha de Nacimiento'
                                    value={formValues.fechaNacimiento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="sexo">Sexo</label>
                                <select
                                    name="sexo"
                                    value={formValues.sexo}
                                    onChange={handleChange}>
                                    required
                                    <option value="">Seleccione una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <div className='registros' >
                                <label htmlFor="obraSocial">Obra Social</label>
                                <input
                                    type="text"
                                    name="obraSocial"
                                    placeholder='Obra Social'
                                    value={formValues.obraSocial}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="plan">Plan</label>
                                <input
                                    type="text"
                                    name="plan"
                                    placeholder='Plan'
                                    value={formValues.plan}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="carnet">Carnet</label>
                                <input
                                    type="text"
                                    name="carnet"
                                    placeholder='Carnet'
                                    value={formValues.carnet}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="dni">DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    placeholder='D.N.I'
                                    value={formValues.dni}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="provincia">Provincia</label>
                                <input
                                    type="text"
                                    name="provincia"
                                    placeholder='Provincia'
                                    value={formValues.provincia}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    placeholder='Ciudad'
                                    value={formValues.ciudad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    placeholder='Direccion'
                                    value={formValues.direccion}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="telefono">Telefono</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    placeholder='Telefono'
                                    value={formValues.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    value={formValues.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </fieldset>
                    <div className='botones-registro'>
                        <button className='boton-registro' type="submit">Guardar</button>
                        <button className='boton-registro cancelar' onClick={() => navigate('/pacientes')}>Cancelar</button>
                    </div>

                </form>
            </div>
        </div>
    );
};
