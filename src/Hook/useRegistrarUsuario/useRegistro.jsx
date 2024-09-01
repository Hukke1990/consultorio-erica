import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import appFirebase from "../../credenciales";
import { useNavigate } from "react-router-dom";

const db = getFirestore(appFirebase);

const useRegistro = (uidUsuario) => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    sexo: "",
    obraSocial: "",
    plan: "",
    carnet: "",
    dni: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const [mensajeExito, setMensajeExito] = useState("");
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
      Object.entries(formValues).filter(([key, value]) => value.trim() !== "")
    );

    if (Object.keys(filteredValues).length === 0) {
      alert("Todos los campos están vacíos.");
      return;
    }

    try {
      await addDoc(collection(db, "pacientes"), {
        ...filteredValues,
        userId: uidUsuario, // Guardar el ID del usuario
      });
      setMensajeExito(
        `Paciente ${formValues.nombre} ${formValues.apellido} registrado con éxito`
      );
      setFormValues({
        nombre: "",
        segundoNombre: "",
        apellido: "",
        segundoApellido: "",
        fechaNacimiento: "",
        sexo: "",
        obraSocial: "",
        plan: "",
        carnet: "",
        dni: "",
        provincia: "",
        ciudad: "",
        direccion: "",
        telefono: "",
        email: "",
      });
      setTimeout(() => navigate("/pacientes"), 3000);
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      alert("Hubo un error al registrar el paciente");
    }
  };

  return {
    formValues,
    mensajeExito,
    handleChange,
    handleSubmit,
  };
};

export default useRegistro;
