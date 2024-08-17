import React, { useState, useEffect } from 'react';
import './DarkAndLight.css';

export const DarkAndLight = () => {
    // Por defecto, el modo oscuro es falso (modo claro activado)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // useEffect para aplicar el tema claro al cargar la página
    useEffect(() => {
        // Al cargar la página, asegurarse de que el modo claro esté activado
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }, []); // Se ejecuta solo una vez cuando el componente se monta

    // Función para alternar entre temas
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);

        // Añadir o eliminar la clase del body
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
    };

    return (
        <label className='switch'>
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
            />
            <span className="slider round"></span>
        </label>
    );
};
