import React, { useState, useEffect } from 'react';
import './Usuario.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import appFirebase from '../../../src/credenciales';

const storage = getStorage(appFirebase);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export const Usuario = () => {
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null); // Para la miniatura
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState({});
    const [showEditAvatar, setShowEditAvatar] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const uid = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', uid);
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
            const userDocRef = doc(db, 'users', uid);
            await updateDoc(userDocRef, {
                avatarURL: avatarURL
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
            console.error("Error al enviar el correo de cambio de contraseña:", error);
            setMessage("Error al enviar el correo de cambio de contraseña");
        }
    };

    // URL de la imagen genérica
    const defaultAvatar = 'path_to_generic_avatar.png';

    return (
        <div className='contenedor-pacientes'>
            <div className='padre-pacientes'>
                <div className='padre-titulo titulo'>
                    <h1>Mi Perfil</h1>
                </div>
                <fieldset className='fieldset-registro miPerfil'>
                    <img
                        src={userData.avatarURL || avatarPreview || defaultAvatar}
                        alt="Avatar"
                        className='estilo-profile'
                    />
                    <ul>
                        <li>{userData.nombre} {userData.apellido}</li>
                        <li>Email: {userData.email}</li>
                        <li>Rol: {userData.role}</li>
                    </ul>
                    <button className='boton-registro' onClick={() => setShowEditAvatar(!showEditAvatar)}>
                        {showEditAvatar ? 'Cerrar Edición' : 'Editar Avatar'}
                    </button>

                    {showEditAvatar && (
                        <div className='editar-avatar'>
                            <input
                                type="file"
                                id="file-input"
                                onChange={handleFileChange}
                                style={{ display: 'none' }} // Ocultar el botón de archivo
                            />
                            <button
                                onClick={() => document.getElementById('file-input').click()}
                                className='boton-registro'
                            >
                                Seleccionar Archivo
                            </button>
                            <div className='avatar-preview'>
                                {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" />}
                            </div>
                            <button className='boton-registro' onClick={handleUpload}>Subir Avatar</button>
                        </div>
                    )}

                    <div className='cambio-contrasena'>
                        <button className='boton-registro' onClick={handlePasswordReset}>Cambiar Contraseña</button>
                    </div>
                </fieldset>

                <p>{message}</p>
            </div>
        </div>
    );
};
