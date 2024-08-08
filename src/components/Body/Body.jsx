import React from 'react';
import { NavLink } from 'react-router-dom';
import './Body.css';

export const Body = () => {
    return (
        <div className='contenedor-body'>
            <div className='padre-body'>
                <h2 className='padre-titulo'>Noticias y Recordatorios</h2>

                <h3>Noticias</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni nam itaque fuga explicabo. Magni ipsa enim nobis, ab at corporis accusantium architecto quas aliquid rem necessitatibus magnam vero vitae voluptatum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, necessitatibus</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat culpa corporis iusto itaque harum sequi eveniet. Officia quisquam corrupti facere vitae, nemo molestias nesciunt iste dolor quae. Nemo, amet perspiciatis?</p>
                <p>Lorem, Fugiat culpa corporis iusto itaque harum sequi eveniet. Officia quisquam corrupti facere vitae, nemo molestias nesciunt iste dolor quae. Nemo, amet perspiciatis?</p>
                <p>Recordatorio: lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Tips para una alimentación saludable durante el verano</p>

                <h3>Recordatorios de Consultas</h3>
                <p>Consulta con el Dr. Pérez a las 10:00 AM</p>
                <p>Consulta con la Dra. Gómez a las 11:30 AM</p>
                <p>Consulta con el Dr. Martínez a las 1:00 PM</p>
            </div>
        </div>
    );
};
