import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import useRegistro from "../../../Hook/useRegistrarUsuario/useRegistro";
import "./Registro.css";
import { IdiomaContext } from "../../../components/IdiomaContext/IdiomaContext";

export const Registro = ({ uidUsuario }) => {
  const { formValues, mensajeExito, handleChange, handleSubmit } =
    useRegistro(uidUsuario);
  const { idioma } = useContext(IdiomaContext); // Obtener el idioma del contexto

  const textos = {
    es: {
      registrarPaciente: "Registrar paciente",
      nombre: "Nombre",
      segundoNombre: "Segundo nombre (Opcional)",
      apellido: "Apellido",
      segundoApellido: "Segundo apellido (Opcional)",
      fechaNacimiento: "Fecha de Nacimiento",
      sexo: "Sexo",
      masculino: "Masculino",
      femenino: "Femenino",
      obraSocial: "Obra Social",
      plan: "Plan",
      carnet: "Carnet",
      dni: "D.N.I",
      provincia: "Provincia",
      ciudad: "Ciudad",
      direccion: "Dirección",
      telefono: "Telefono",
      email: "Email",
      registrar: "Registrar",
      cancelar: "Cancelar",
      mensajeExito: `Paciente ${formValues.nombre} ${formValues.apellido} registrado con éxito`,
    },
    en: {
      registrarPaciente: "Register patient",
      nombre: "First Name",
      segundoNombre: "Middle Name (Optional)",
      apellido: "Last Name",
      segundoApellido: "Second Last Name (Optional)",
      fechaNacimiento: "Date of Birth",
      sexo: "Gender",
      masculino: "Male",
      femenino: "Female",
      obraSocial: "Health Insurance",
      plan: "Plan",
      carnet: "Card",
      dni: "ID",
      provincia: "State",
      ciudad: "City",
      direccion: "Address",
      telefono: "Phone",
      email: "Email",
      registrar: "Register",
      cancelar: "Cancel",
      mensajeExito: `Patient ${formValues.nombre} ${formValues.apellido} registered successfully`,
    },
  };

  return (
    <div className="contenedor-registro">
      <div className="padre-registro">
        <h1>{textos[idioma].registrarPaciente}</h1>
        <form className="form-registro" onSubmit={handleSubmit}>
          <fieldset className="fieldset-registro">
            <div className="inputs-registro">
              <div className="registros">
                <label htmlFor="nombre">{textos[idioma].nombre}</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder={textos[idioma].nombre}
                  value={formValues.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="segundoNombre">
                  {textos[idioma].segundoNombre}
                </label>
                <input
                  type="text"
                  name="segundoNombre"
                  placeholder={textos[idioma].segundoNombre}
                  value={formValues.segundoNombre}
                  onChange={handleChange}
                />
              </div>
              <div className="registros">
                <label htmlFor="apellido">{textos[idioma].apellido}</label>
                <input
                  type="text"
                  name="apellido"
                  placeholder={textos[idioma].apellido}
                  value={formValues.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="segundoApellido">
                  {textos[idioma].segundoApellido}
                </label>
                <input
                  type="text"
                  name="segundoApellido"
                  placeholder={textos[idioma].segundoApellido}
                  value={formValues.segundoApellido}
                  onChange={handleChange}
                />
              </div>
              <div className="registros">
                <label htmlFor="fechaNacimiento">
                  {textos[idioma].fechaNacimiento}
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  placeholder={textos[idioma].fechaNacimiento}
                  value={formValues.fechaNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="sexo">{textos[idioma].sexo}</label>
                <select
                  name="sexo"
                  value={formValues.sexo}
                  onChange={handleChange}
                  required
                >
                  <option value="">{textos[idioma].sexo}</option>
                  <option value="Masculino">{textos[idioma].masculino}</option>
                  <option value="Femenino">{textos[idioma].femenino}</option>
                </select>
              </div>
              <div className="registros">
                <label htmlFor="obraSocial">{textos[idioma].obraSocial}</label>
                <input
                  type="text"
                  name="obraSocial"
                  placeholder={textos[idioma].obraSocial}
                  value={formValues.obraSocial}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="plan">{textos[idioma].plan}</label>
                <input
                  type="text"
                  name="plan"
                  placeholder={textos[idioma].plan}
                  value={formValues.plan}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="carnet">{textos[idioma].carnet}</label>
                <input
                  type="text"
                  name="carnet"
                  placeholder={textos[idioma].carnet}
                  value={formValues.carnet}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="dni">{textos[idioma].dni}</label>
                <input
                  type="text"
                  name="dni"
                  placeholder={textos[idioma].dni}
                  value={formValues.dni}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="provincia">{textos[idioma].provincia}</label>
                <input
                  type="text"
                  name="provincia"
                  placeholder={textos[idioma].provincia}
                  value={formValues.provincia}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="ciudad">{textos[idioma].ciudad}</label>
                <input
                  type="text"
                  name="ciudad"
                  placeholder={textos[idioma].ciudad}
                  value={formValues.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="direccion">{textos[idioma].direccion}</label>
                <input
                  type="text"
                  name="direccion"
                  placeholder={textos[idioma].direccion}
                  value={formValues.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="telefono">{textos[idioma].telefono}</label>
                <input
                  type="text"
                  name="telefono"
                  placeholder={textos[idioma].telefono}
                  value={formValues.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="registros">
                <label htmlFor="email">{textos[idioma].email}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={textos[idioma].email}
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>
          <div className="botones-registro">
            <button type="submit" className="boton-registro">
              {textos[idioma].registrar}
            </button>
            <NavLink to="/pacientes">
              <button type="button" className="boton-registro cancelar">
                {textos[idioma].cancelar}
              </button>
            </NavLink>
          </div>
        </form>
        {mensajeExito && (
          <div className="mensaje-exito">
            <p>{textos[idioma].mensajeExito}</p>
          </div>
        )}
      </div>
    </div>
  );
};
