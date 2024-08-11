import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Mensaje from "./Alerts"
import axios from "axios"

export const Formulario = ({ institucion }) => {
    const location = useLocation()
    const urlActual = location.pathname
    const [mensajeBoton, setMensajeBoton] = useState('')

    
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})

    console.log(urlActual)
    const [form, setForm] = useState({
        nombre: institucion?.institucion?.nombre ?? "",
        direccion: institucion?.institucion?.direcion ?? "",
        email: institucion?.institucion?.email ?? "",
        telefono: institucion?.institucion?.telefono ?? "", 
        detalles: institucion?.institucion?.detalles ?? "",
        categoria: institucion?.categoria?.categoria ?? ""
    })

    console.log(form);
    
    useEffect (()=> {
        const textoBoton = () => {

            if (urlActual === "/dashboard/listaInstituciones") {
                setMensajeBoton("Registrar Ayuda")
    
            }else if (urlActual === "/dashboard/crear") {
                setMensajeBoton("Registrar Institución")
            }else if (urlActual === "/dashboard/actualizar") {
                setMensajeBoton("Actualizar Institución")
            }
        }
        textoBoton()
    },[urlActual]) 


    const handleChange = (e) => { // Paso 2 Función para manejar los cambios en los inputs
        setForm({...form, // Copiar el estado actual
            [e.target.name]:e.target.value // Cambiar el valor del input en el estado
        })
    }
    // Función para enviar los datos del formulario
    const handleSubmit = async(e) => { 
      // Prevención de recarga de la página al enviar el formulario
      e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/creari`
            const options={
                headers: {
                    'Content-Type': 'application/json', // Informar al servidor que se envia un JSON
                    Authorization: `Bearer ${token}` // Enviar el token en la cabecera
                }
            }
            const response = await axios.post(url,form,options)
            setMensaje({ 
                respuesta:"institucion registrado con exito y correo enviado",
                tipo: true
            })
            setTimeout(() => {
                navigate('/dashboard/crear');
            }, 3000);
            console.log(response);
        } catch (error) {
            console.log(error);
            setMensaje({ 
                respuesta: error.response.data.msg,
                tipo: false 
            })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }
       
    
    
    return (
        <form onSubmit={handleSubmit}>

            <div>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la Institucion: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                    onChange={handleChange}
                    value={form.nombre || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion'
                    name='direccion'
                    onChange={handleChange}
                    value={form.direccion || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <input
                    id='telefono'
                    type="tel"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='telefono'
                    name='telefono'
                    onChange={handleChange}
                    value={form.telefono || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email'
                    name='email'
                    onChange={handleChange}
                    value={form.email || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Categoria: </label>
                <input
                    id='categoria'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='categoria'
                    name='categoria'
                    onChange={handleChange}
                    value={form.categoria || ""}
                />
            </div>

            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-700 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                    onChange={handleChange}
                    value={form.detalles || ""}
                />
            </div>

            <input
                type="submit"
                className='bg-green-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
        value={institucion?.institucion ? 'Actualizar': 'Registrar'}
        /> 
        </form>
    )
}