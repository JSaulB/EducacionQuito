import { Link,useLocation } from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from "../context/AuthProvider";

export const Perfil = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const {auth} = useContext(AuthContext)
    console.log(auth)
    return (

        <form>
            <h1 className='text-center text-white text-3xl font-bold font-serif mb-20 mt-40 '> Menú Principal</h1>

            <ul className="mt-5 flex flex-wrap justify-center gap-4">
    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/crearUsuario' 
            className={`${urlActual === '/dashboard/crearUsuario' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Crear Usuarios
        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/listar' 
            className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Lista de Usuarios
        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/crear' 
            className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Registrar Instituciones
        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/listaInstituciones' 
            className={`${urlActual === '/dashboard/listaInstituciones' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Lista de Instituciones
        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center" style={{ height: '150px', width: '150px' }}>
        <Link 
            to='/dashboard/actualizar' 
            className={`${urlActual === '/dashboard/actualizar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Actualizar Institución
        </Link>
    </li>
</ul>



        </form>
    )
}
