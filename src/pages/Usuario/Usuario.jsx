import React from "react";
import "./Usuario.css";
import useUsuario from "../../Hook/useUsuarios/useUsuario";

export const Usuario = () => {
  const {
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
  } = useUsuario();

  // URL de la imagen genérica
  const defaultAvatar = "path_to_generic_avatar.png";

  return (
    <div className="contenedor-pacientes">
      <div className="padre-pacientes">
        <div className="padre-titulo titulo">
          <h1>Mi Perfil</h1>
        </div>
        <fieldset className="fieldset-registro miPerfil">
          <img
            src={userData.avatarURL || avatarPreview || defaultAvatar}
            alt="Avatar"
            className="avatarUsuario"
          />
          <div className="contenedor-datos">
            <ul>
              <li>Nombre: {userData.nombre}</li>
              <li>Apellido: {userData.apellido}</li>
            </ul>
          </div>
          <button
            className={`boton-registro botonAvatar ${
              isEditingAvatar ? "activo" : ""
            }`}
            onClick={() => {
              setShowEditAvatar(!showEditAvatar);
              setIsEditingAvatar(!isEditingAvatar); // Alternar estado
            }}
          >
            {showEditAvatar ? "Cerrar Edición" : "Editar Avatar"}
          </button>

          {showEditAvatar && (
            <div className="editar-avatar">
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                style={{ display: "none" }} // Ocultar el botón de archivo
              />
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="boton-registro"
              >
                Seleccionar Archivo
              </button>
              <div className="avatar-preview">
                {avatarPreview && (
                  <img src={avatarPreview} alt="Avatar Preview" />
                )}
              </div>
              <button className="boton-registro" onClick={handleUpload}>
                Subir Avatar
              </button>
            </div>
          )}

          <div className="cambio-contrasena">
            <button className="boton-registro" onClick={handlePasswordReset}>
              Cambiar Contraseña
            </button>
          </div>
        </fieldset>

        <p>{message}</p>
      </div>
    </div>
  );
};
