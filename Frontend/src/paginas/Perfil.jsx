import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from "../context/AuthProvider";

export const Perfil = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const {auth} = useContext(AuthContext)
    console.log(auth)
    return (

        <form>
            <h1 className='text-center text-white text-3xl font-bold font-serif mt-2 mb-40 '> Menú Principal</h1>

            <ul className="mt-5 flex flex-wrap justify-center gap-4">
    <li className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/crearUsuario' 
            className={`${urlActual === '/dashboard/crearUsuario' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'} text-xl block text-center hover:text-slate-600`}
        >
            Crear Usuarios
        </Link>
    </li>

    <li className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/listar' 
            className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'} text-xl block text-center hover:text-slate-600`}
        >
            Lista de Usuarios
        </Link>
    </li>

    <li className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/crear' 
            className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'} text-xl block text-center hover:text-slate-600`}
        >
            Registrar Instituciones
        </Link>
    </li>

    <li className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/listaInstituciones' 
            className={`${urlActual === '/dashboard/listaInstituciones' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'} text-xl block text-center hover:text-slate-600`}
        >
            Lista de Instituciones
        </Link>
    </li>

    <li className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/actualizar' 
            className={`${urlActual === '/dashboard/actualizar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'} text-xl block text-center hover:text-slate-600`}
        >
            Actualizar Institución
        </Link>
    </li>
</ul>





            {/* <div> 
                <h1 className='font-black text-4xl text-gray-100'>Perfil</h1>
                <hr className='my-4' />
                <p className='mb-8'>Visualizar Perfil</p>
            </div> */}

            {/* <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
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
                    className='text-gray-100 uppercase font-bold text-sm'>Apellido: </label>
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
                    className='text-gray-100 uppercase font-bold text-sm'>Email: </label>
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
                    className='text-gray-100 uppercase font-bold text-sm'>Modo: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                />
            </div> */}

            

                {/* <input
                    type="submit"
                    className='bg-green-600 w-m p-3 
            text-slate-300 uppercase font-bold rounded-lg 
            hover:bg-gray-600 cursor-pointer transition-all'
                    value='Actualizar' /> */}

        </form>
    )
}
