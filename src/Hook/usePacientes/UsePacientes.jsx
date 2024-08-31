import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import appFirebase from "../../credenciales";

const db = getFirestore(appFirebase);

const usePacientes = (uidUsuario, filtroNombre, filtroApellido) => {
  const [pacientes, setPacientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const pacientesRef = collection(db, "pacientes");
        const q = query(pacientesRef, where("userId", "==", uidUsuario));
        const querySnapshot = await getDocs(q);
        const pacientesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let pacientesFiltrados = pacientesList;

        if (filtroNombre.trim() !== "") {
          pacientesFiltrados = pacientesFiltrados.filter((paciente) =>
            paciente.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
          );
        }

        if (filtroApellido.trim() !== "") {
          pacientesFiltrados = pacientesFiltrados.filter((paciente) =>
            paciente.apellido
              .toLowerCase()
              .includes(filtroApellido.toLowerCase())
          );
        }

        setPacientes(pacientesFiltrados);
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerPacientes();
  }, [filtroNombre, filtroApellido, uidUsuario]);

  const borrarPaciente = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      try {
        await deleteDoc(doc(db, "pacientes", id));
        setPacientes(pacientes.filter((paciente) => paciente.id !== id));
        alert("Paciente eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        alert("Hubo un error al eliminar el paciente");
      }
    }
  };

  return { pacientes, isLoading, borrarPaciente };
};

export default usePacientes;
