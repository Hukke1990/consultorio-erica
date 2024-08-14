import React, { useState } from 'react';

export const DarkAndLight = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

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
        // <button onClick={toggleTheme}>
        //     {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        // </button>

        <label className='switch'>
            <input type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
            />
            <span className="slider round">

            </span>
        </label>
    );
};
