import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Mensaje from '../componets/Alerts';
import axios from 'axios';

export const Confirmar = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({});

    const verifyToken = async()=>{
        // Manejo de errores en el envío de datos
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            const respuesta = await axios.get(url)
            console.log(respuesta);
            setMensaje({respuesta:respuesta.data.msg,tipo:true})
        } catch (error) {
            setMensaje({respuesta:error.response.data.msg,tipo:false})
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])
    return (
        
        <div className="flex flex-col items-center justify-center">
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRSEkWXCLagJhaguly9WAe2qALHp8USR9Tiw&s" alt="image description"/>

                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">¡Excelente!, tu cuenta ha sido confirmada 😊</p>
            <div className="flex flex-col items-center justify-center">
                <p className="md:text-lg lg:text-xl text-gray-100 mt-8">Ya puedes iniciar sesión</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-green-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-green-800 hover:text-white">Login</Link>
            </div>

        </div>
    )
}
