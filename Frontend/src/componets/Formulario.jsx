import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export const Formulario = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const [mensajeBoton, setMensajeBoton] = useState('')

    console.log(urlActual)
    
    
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
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
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
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
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
                    className='text-gray-700 uppercase font-bold text-sm'>Categoria: </label>
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