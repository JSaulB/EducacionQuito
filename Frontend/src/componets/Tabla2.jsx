import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mensaje from "./Alerts";
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
    const { auth } = useContext(AuthContext);
    const [instituciones, setInstituciones] = useState([]);

    const listarInstituciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${process.env.VITE_BACKEND_URL}/listai`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setInstituciones(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarInstituciones();
    }, []);

    return (
        <>
            {instituciones.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {instituciones.map((institucion, index) => (
                        <li
                            key={institucion._id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            <Link
                                to={`/dashboard/actualizar/${institucion._id}`}
                                className="block p-6 text-center"
                            >
                                <h2 className="font-semibold text-lg text-gray-700 mb-3">
                                    {index + 1}. {institucion.nombre}
                                </h2>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0JvVF5FJgxUvqkgEL-_lBh0mZQlweJM8Jg&s"
                                    alt={`Imagen de ${institucion.nombre}`}
                                    className="mx-auto mb-3 border-2 border-gray-200 rounded-full"
                                    width={80}
                                    height={80}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default Tabla;
