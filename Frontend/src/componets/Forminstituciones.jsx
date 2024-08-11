import axios from 'axios';
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Mensaje from "./Alerts";

export const Formularioinstituciones = ({ institucion }) => {
    // Convertir la fecha ISO 8601 a formato 'YYYY-MM-DD'
   

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    
    const [form, setForm] = useState({
        nombre: institucion?.institucion?.nombre ?? "",
        dirrecion: institucion?.institucion?.dirrecion ?? "",
        email: institucion?.institucion?.email ?? "",
        telefono: institucion?.institucion?.telefono ?? "", 
        detalles: institucion?.institucion?.detalles ?? "",
        categoria: institucion?.categoria?.categoria ?? ""
    })

    console.log(form);


    return (
        <form>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='dirrecion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='dirreccion'
                    name='dirrecion'
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
                />
            </div>

            <input
                type="submit"
                className='bg-green-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
                value={mensajeBoton} />

        </form>
    )

}