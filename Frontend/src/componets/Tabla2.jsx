import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alerts";
import AuthContext from "../context/AuthProvider";
import { Link,useLocation } from 'react-router-dom'

const Tabla = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)

    const [instituciones, setinstituciones] = useState([])
    
    const listarinstituciones = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/listai`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setinstituciones(respuesta.data, ...instituciones)
        } catch (error) {
            console.log(error);
        }
    }

    

    useEffect(() => {
        listarinstituciones()
    }, [])


    return (
        <>
            {instituciones.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <ul className="grid grid-cols-4 gap-4 mt-5">
                    {instituciones.map((institucion, index) => (
                        <li
                            key={institucion._id}
                            className="rounded-lg shadow-md hover:bg-white font-bold"
                            style={{ height: '180px', width: '160px' }}
                        >
                            <Link
                                to={`/dashboard/actualizar/${institucion._id}`}
                                className="bg-gray-400 p-4 flex flex-col items-center justify-center text-slate-900 text-xl text-center hover:text-slate-600"
                                style={{ height: '100%', width: '100%', display: 'block' }}
                            >
                                <span>{index + 1}. {institucion.nombre}</span>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0JvVF5FJgxUvqkgEL-_lBh0mZQlweJM8Jg&s"
                                    alt={`Imagen de ${institucion.nombre}`}
                                    className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full"
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
export default Tabla