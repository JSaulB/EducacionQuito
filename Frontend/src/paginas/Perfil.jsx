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
            <img src="https://c0.klipartz.com/pngpicture/322/368/gratis-png-ilustracion-de-la-casa-blanca-pagina-de-inicio-iconos-de-computadora-sitio-web-world-wide-web-icono-de-pagina-de-inicio-azul.png" alt="img-client" className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full" width={80} height={80} />
            <h1 className='text-center text-white text-3xl  font-medium mb-40 mt-10  underline  '> MODULO DE INICIO</h1>

            <ul className="mt-5 flex flex-wrap justify-center gap-4">
    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center hover:bg-white font-bold" style={{ height: '180px', width: '160px' }}>
        <Link 
            to='/dashboard/ministerio' 
            className={`${urlActual === '/dashboard/ministerio' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >Crear Privilegio
            <img src="https://previews.123rf.com/images/rizkiahmadfauzi28/rizkiahmadfauzi282304/rizkiahmadfauzi28230403919/203130378-icono-de-usuario-con-candado-sobre-fondo-blanco-ilustraci%C3%B3n-3d-aislada.jpg" alt="img-client" className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full" width={80} height={80} />
        </Link>
        
    </li>    
   

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center hover:bg-white font-bold" style={{ height: '180px', width: '160px' }}>
        <Link 
            to='/dashboard/listaUsuarios' 
            className={`${urlActual === '/dashboard/listaUsuarios' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >Lista de Usuarios
        <img src="https://w7.pngwing.com/pngs/477/1005/png-transparent-user-computer-icons-logo-others-service-logo-computer-wallpaper.png" alt="img-client" className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full" width={80} height={80} />
        
        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center hover:bg-white font-bold" style={{ height: '180px', width: '160px' }}>
        <Link 
            to='/dashboard/crear' 
            className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Registrar Instituciones
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0JvVF5FJgxUvqkgEL-_lBh0mZQlweJM8Jg&s" alt="img-client" className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full" width={80} height={80} />

        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center hover:bg-white font-bold" style={{ height: '180px', width: '160px' }}>
        <Link 
            to='/dashboard/listaInstituciones' 
            className={`${urlActual === '/dashboard/listaInstituciones' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >
            Lista de Instituciones
            <img src="https://w7.pngwing.com/pngs/658/115/png-transparent-finance-financial-institution-bank-capital-one-financial-statement-study-abroad-angle-service-logo-thumbnail.png" alt="img-client" className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full" width={80} height={80} />
        </Link>
    </li>

    <li className="bg-gray-400 p-4 rounded-lg shadow-md flex items-center justify-center hover:bg-white font-bold" style={{ height: '180px', width: '160px' }}>
        <Link 
            to='/dashboard/actualizar' 
            className={`${urlActual === '/dashboard/actualizar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-900'} text-xl block text-center hover:text-slate-600`}
        >Actualizar Institución
        <img src="https://images.vexels.com/media/users/3/141104/isolated/preview/57003a56b5f8470651295adb4b7be139-actualizar-signo-de-flecha.png" alt="img-client" className="m-auto mt-3 p-1 border-2 border-slate-00 rounded-full" width={80} height={80} />
        </Link>
    </li>



</ul>




        </form>
    )
}
