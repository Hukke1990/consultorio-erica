import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import appFirebase from "../../credenciales";

const storage = getStorage(appFirebase);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const useUsuario = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data); // Verificar los datos obtenidos
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0])); // Crear la URL para la miniatura
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    const uid = auth.currentUser.uid;
    const avatarRef = ref(storage, `avatars/${uid}/${avatar.name}`);

    try {
      await uploadBytes(avatarRef, avatar);
      const avatarURL = await getDownloadURL(avatarRef);

      // Guardar la URL en Firestore
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        avatarURL: avatarURL,
      });

      setMessage("Avatar actualizado exitosamente");
      setUserData((prevState) => ({ ...prevState, avatarURL }));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setMessage("Error al subir la imagen");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      setMessage("Correo de cambio de contraseña enviado");
    } catch (error) {
      console.error(
        "Error al enviar el correo de cambio de contraseña:",
        error
      );
      setMessage("Error al enviar el correo de cambio de contraseña");
    }
  };

  return {
    avatar,
    avatarPreview,
    message,
    userData,
    showEditAvatar,
    isEditingAvatar,
    setShowEditAvatar,
    setIsEditingAvatar,
    handleFileChange,
    handleUpload,
    handlePasswordReset,
  };
};

export default useUsuario;
