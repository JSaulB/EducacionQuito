import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InstitucionEspecifica = () => {
    const { id } = useParams();
    const [institucion, setInstitucion] = useState(null);

    useEffect(() => {
        const obtenerInstitucion = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${process.env.VITE_BACKEND_URL}/institucion/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setInstitucion(respuesta.data);
            } catch (error) {
                console.log(error);
            }
        };

        obtenerInstitucion();
    }, [id]);
    console.log(institucion);
    if (!institucion) {
        return <p className="text-center text-gray-500">Cargando...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className='text-4xl font-bold text-gray-800 mb-4 text-center'>{institucion.nombre}</h1>
            <hr className='my-4 border-gray-300' />
            <div className="space-y-4 text-gray-700">
                <p><strong>Dirección:</strong> {institucion.direccion}</p>
                <p><strong>Teléfono:</strong> {institucion.telefono}</p>
                <p><strong>Email:</strong> {institucion.email}</p>
                <p><strong>Categoría:</strong> {institucion.categoria}</p>
                <p><strong>Infraestructura:</strong> {institucion.Infraestructura}</p>
                <p><strong>Socioeconómico:</strong> {institucion.socieconomico}</p>
                <p><strong>Número de Estudiantes:</strong> {institucion.Nestudiantes}</p>
                <p><strong>Observaciones:</strong> {institucion.descripcion}</p>
            </div>
        </div>
    );
};

export default InstitucionEspecifica

