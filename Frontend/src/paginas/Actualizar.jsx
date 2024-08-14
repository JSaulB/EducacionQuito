import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID desde la URL
import axios from 'axios';
import Mensaje from "../componets/Alerts";
import { Formulario } from '../componets/Formulario';

export const Actualizar = () => {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const [institucion, setInstitucion] = useState(null);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const obtenerInstitucion = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${process.env.VITE_BACKEND_URL}/institucion/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setInstitucion(respuesta.data);
            } catch (error) {
                console.log(error);
                setMensaje({ 
                    respuesta: 'Hubo un error al cargar los datos de la institución.',
                    tipo: false 
                });
            }
        };
        obtenerInstitucion();
    }, [id]);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>ACTUALIZAR INSTITUCIÓN</h1>
            <hr className='my-4'/>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            {institucion && <Formulario institucion={institucion} />}
        </div>
    );
};





