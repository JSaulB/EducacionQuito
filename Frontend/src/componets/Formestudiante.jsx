import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Mensaje from "./Alerts"
import axios from "axios"
import ListaInstituciones from "../paginas/ListaInstituciones"




export const FormularioEstudiante = ({ estudiante }) => {
    const location = useLocation()
    const urlActual = location.pathname
    const [mensajeBoton, setMensajeBoton] = useState('')

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

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})

    console.log(urlActual)
    const [form, setForm] = useState({
        nombre: estudiante?.estudiante?.nombre ?? "",
        apellido :estudiante?.estudiante?.apellido ?? "",
        direccion: estudiante?.estudiante?.direcion ?? "",
        email: estudiante?.estudiante?.email ?? "",
        telefono: estudiante?.estudiante?.telefono ?? "", 
        institucion: estudiante?.estudiante?.institucion ?? "",
        historialSocioeconomico: estudiante?.estudiante?. historialSocioeconomico ?? ""
    })

    console.log(form);
    
    useEffect (()=> {
        listarinstituciones()
        const textoBoton = () => {

            if (urlActual === "/dashboard/listaestudiantees") {
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
            const url = `${process.env.VITE_BACKEND_URL}/creare`
            const options={
                headers: {
                    'Content-Type': 'application/json', // Informar al servidor que se envia un JSON
                    Authorization: `Bearer ${token}` // Enviar el token en la cabecera
                }
            }
            const response = await axios.post(url,form,options)
            setMensaje({ 
                respuesta:"estudiante registrado con exito y correo enviado",
                tipo: true
            })
            setTimeout(() => {
                navigate('/dashboard/crearestudiante');
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
                    className='text-gray-700 uppercase font-bold text-sm'>Institucion: </label>
                <input
                    id='Intitucion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Intitucion'
                    name='Intitucion'
                    onChange={handleChange}
                    value={form.institucion || ""}
                />
            </div>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del estudiante: </label>
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
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del estudiante: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido'
                    name='apellido'
                    onChange={handleChange}
                    value={form.apellido || ""}
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
                    className='text-gray-700 uppercase font-bold text-sm'>Historial Socioeconomico: </label>
                <input
                    id='Historial Socioeconomico:'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Historial Socioeconomico:'
                    name='Historial Socioeconomico:'
                    onChange={handleChange}
                    value={form.historialSocioeconomico || ""}
                />
            </div>

            <input
                type="submit"
                className='bg-green-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
        value={estudiante?.estudiante ? 'Actualizar': 'Registrar'}
        /> 
        </form>
        
    )
}