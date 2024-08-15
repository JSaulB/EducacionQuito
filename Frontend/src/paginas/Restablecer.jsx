import { PiPasswordFill } from "react-icons/pi"
import Mensaje from '../componets/Alerts'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Restablecer = () => {
    const { token } = useParams();//Paso1 capturar el token de la url
    const [mensaje, setMensaje] = useState({})//paso3
	const [tokenback, setTokenBack] = useState(false)
    
    //Paso 1 definir la logica
	const verifyToken = async()=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
						setTokenBack(true)
            setMensaje({respuesta:respuesta.data.msg,tipo:true})//paso3
        } catch (error) {
            setMensaje({respuesta:error.response.data.msg,tipo:false})//paso3
        }
    }

    //Paso 2 ejecuta la logica
    useEffect(() => {
        verifyToken()
    }, [])

    const navigate = useNavigate();

    const [form, setForm] = useState({
            password:"",
            confirmpassword:""
        })

    const handleChange = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }

    const handleSubmit = async(e) => {
            e.preventDefault()
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
                const respuesta = await axios.post(url,form)
                setForm({})
                setMensaje({respuesta:respuesta.data.msg,tipo:true})
                            setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) { 
                setMensaje({respuesta:error.response.data.msg,tipo:false})
            }
        }
    /*return(
        <>
        <div>Restablecer</div> 
        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        </>
    )*/       
       
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div className="w-full max-w-xs">
                <h1 className="text-2xl font-semibold mb-2 text-center uppercase text-white">Restablecer Contraseña</h1>
                <small className="text-gray-400 block my-2 text-center">Por favor, ingresa tu nueva contraseña</small>
                <PiPasswordFill className="text-5xl text-red-500 mx-auto mb-4" />
                {tokenback && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white">Nueva Contraseña</label>
                            <input
                                type="password"
                                placeholder="Ingresa tu nueva contraseña"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500 text-sm"
                                value={form.password || ""}
                                name='password'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Confirmar Contraseña</label>
                            <input
                                type="password"
                                placeholder="Repite tu nueva contraseña"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500 text-sm"
                                value={form.confirmpassword || ""}
                                name='confirmpassword'
                                onChange={handleChange}
                            />
                        </div>
                        <button className="bg-gray-600 text-white py-2 px-4 w-full rounded-xl mt-4 hover:scale-105 duration-300 hover:bg-gray-900">Enviar</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Restablecer
