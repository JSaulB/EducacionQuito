import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbZoomMoney } from "react-icons/tb";
import axios from 'axios';
import Mensaje from "./Alerts";
import AuthContext from "../context/AuthProvider";

const TablaAyuda = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [instituciones, setInstituciones] = useState([]);
    const [mensaje, setMensaje] = useState({});

    const listarInstituciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/listai`;
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
    };

    useEffect(() => {
        listarInstituciones();
    }, []);

    const handleSelectInstitucion = (id) => {
        navigate(`/dashboard/registrar-ayuda/${id}`);
    };

    return (
        <>
            {instituciones.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <table className="w-full mt-5 table-auto shadow-lg bg-white">
                    <thead className="bg-gray-800 text-slate-400">
                        <tr>
                            <th className="p-2">N°</th>
                            <th className="p-2">Nombre de la Institución</th>
                            <th className="p-2">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instituciones.map((institucion, index) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={institucion._id}>
                                <td>{index + 1}</td>
                                <td>{institucion.nombre}</td>
                                <td className="py-2 text-center">
                                    <TbZoomMoney 
                                        className="h-7 w-7 text-slate-800 cursor-pointer"
                                        onClick={() => handleSelectInstitucion(institucion._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TablaAyuda;
