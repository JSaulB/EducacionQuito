import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alerts";
import AuthContext from "../context/AuthProvider";

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

    const handleDelete = async (id) => {
        try {
            const conformar = confirm('¿Está seguro de eliminar el registro?')
            if (!conformar) {
                return
            }
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/institucion/eliminar/${id}`
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }

            const data = {
                salida: new Date().toISOString(),
            }

            const respuesta = await axios.delete(url, {headers, data})
            await listarinstituciones();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarinstituciones()
    }, [])


    return (
        <>
            {
                instituciones.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>                                
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre de la Institucion</th>
                                <th className='p-2'>Direccion</th>
                                <th className='p-2'>Telefono</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Categoria</th>
                                <th className='p-2'>Estado de la Infraestructura</th>
                                <th className='p-2'>Historial Socieconomico</th>
                                <th className='p-2'>Numero de Estudiantes</th>
                                <th className='p-2'>Observaciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                instituciones.map((institucion, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={institucion._id}>
                                        <td>{index + 1}</td>
                                        <td>{institucion.nombre}</td>
                                        <td>{institucion.direccion}</td>
                                        <td>{institucion.telefono}</td>
                                        <td>{institucion.email}</td>
                                        <td>{institucion.categoria}</td>
                                        <td>{institucion.Infraestructura}</td>
                                        <td>{institucion.socieconomico}</td>
                                        <td>{institucion.Nestudiantes}</td>
                                        <td>{institucion.descripcion}</td>
                    
                                        <td>
                                            <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{institucion.estado && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd 
                                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/listaInstituciones/${institucion._id}`)}
                                            />
                                            {
                                                auth.rol === "Administrador" && (
                                                    <>
                                                        <MdInfo
                                                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                            onClick={() => navigate(`/dashboard/actualizar/${institucion._id}`)}
                                                        />
            
                                                        <MdDeleteForever 
                                                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                            onClick={() => handleDelete(institucion._id)}
                                                        />
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>

    )
}
export default Tabla