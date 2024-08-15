import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios' //paso3
import Mensaje from '../componets/Alerts'

export const Forgot = () => {
    const [email, setEmail] = useState({})//Paso 1
    const [message, setMessage] = useState({})

    //paso2
    const handleChange = (e)=>{
        setEmail({
            ...email,
            [e.target.name]:e.target.value
        })
    }

    //paso3
    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`
            const respuesta = await axios.post(url,email)
            setMessage({respuesta:respuesta.data.msg,tipo:true})//mensaje
            setEmail("") //limpiar campo
        } catch (error) { 
            setMessage({respuesta:error.response.data.error,tipo:false})//mensaje
        }
    }
    console.log(Mensaje);
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {Object.keys(message).length>0 && <Mensaje tipo={message.tipo}>{message.respuesta}</Mensaje>}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-200">Te olvidaste tu contraseña!</h1>
                    <small className="text-gray-400 block my-4 text-sm">No te preocupes, ingresa tu correo para seguir con el procedimiento</small>

                    <form onSubmit={handleSubmit} >
		
		                <div className="mb-1">
		                    <label className="mb-2 block text-sm font-semibold">Email</label>
		                    <input type="email" 
                            //Paso2
                            name='email' 
		                    value={email.email}
                            onChange={handleChange}
                        
                            placeholder="Ingresa tu correo electronico" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
		                    
		                    />
		                </div>
		
		                <div className="mb-3">
		                    <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Enviar Correo
		                    </button>
		                </div>
		
		            </form>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>Ya recordaste tu contraseña?</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Iniciar Sesión</Link>

                    </div>

                </div>

            </div>
        </>
    )
}
