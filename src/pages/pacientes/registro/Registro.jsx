import React, { useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import appFirebase from '../../../../src/credenciales'
import './Registro.css'
import { NavLink, useNavigate } from 'react-router-dom'

const db = getFirestore(appFirebase);

export const Registro = ({ uidUsuario }) => {
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

    const [mensajeExito, setMensajeExito] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Filtrar campos vacíos
        const filteredValues = Object.fromEntries(
            Object.entries(formValues).filter(([key, value]) => value.trim() !== '')
        );

        if (Object.keys(filteredValues).length === 0) {
            alert('Todos los campos están vacíos.');
            return;
        }

        try {
            await addDoc(collection(db, 'pacientes'), {
                ...filteredValues,
                userId: uidUsuario  // Guardar el ID del usuario
            });
            setMensajeExito(`Paciente ${formValues.nombre} ${formValues.apellido} registrado con éxito`);
            setFormValues({
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
            setTimeout(() => navigate('/pacientes'), 3000);
        } catch (error) {
            console.error('Error al registrar paciente:', error);
            alert('Hubo un error al registrar el paciente');
        }
    };

    return (
        <div className='contenedor-registro'>
            <div className='padre-registro'>
                <h1>Registrar paciente</h1>
                <form className='form-registro' onSubmit={handleSubmit}>
                    <fieldset className='fieldset-registro'>
                        <div className='inputs-registro'>
                            <div className='registros' >
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder='Nombre'
                                    value={formValues.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='registros' >
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    name="apellido"
                                    placeholder='Apellido'
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
                        <button type="submit" className='boton-registro'>Registrar</button>
                        <NavLink to='/pacientes'><button type="button" className='boton-registro cancelar'>Cancelar</button></NavLink>
                    </div>
                </form>
                {mensajeExito && (
                    <div className='mensaje-exito'>
                        <p>{mensajeExito}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
