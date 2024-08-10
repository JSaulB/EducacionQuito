import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from "../context/AuthProvider";


export const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const {auth} = useContext(AuthContext)
    console.log(auth)
    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/5 bg-gray-100 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-slate-900'>BIENVENIDO</h2>

                <img src="https://cdn-icons-png.freepik.com/512/16/16480.png" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Hola - {auth?.nombre}</p>
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-red-600 w-3 h-3 inline-block rounded-full'></span> Modo - {auth?.rol}</p>
                <hr className="mt-5 border-slate-500" />

                        
               <form>

                <div> 
                    <h1 className='font-black text-4xl text-gray-900'>Mi Perfil</h1>
                    <hr className='my-4' />
        
                </div>

                <div>
                    <label
                        htmlFor='nombre'
                        className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
                    <input
                        id='nombre'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Nombre'
                        name='Nombre'
                    />
                </div>
                <div>
                    <label
                        htmlFor='apellido'
                        className='text-gray-100 uppercase font-bold text-sm'>Apellido: </label>
                    <input
                        id='apellido'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Apellido'
                        name='Apellido'
                    />
                </div>
                <div>
                    <label
                        htmlFor='email'
                        className='text-gray-100 uppercase font-bold text-sm'>Email: </label>
                    <input
                        id='email'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Email'
                        name='Email'
                    />
                </div>

                <div>
                    <label
                        htmlFor='modo'
                        className='text-gray-100 uppercase font-bold text-sm'>Modo: </label>
                    <textarea
                        id='modo'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='modo'
                    />
                </div>

                <input
                    type="submit"
                    className='bg-green-600 w-m p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-600 cursor-pointer transition-all'
                    value='Actualizar' />

            </form>
                   

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen'>
                <div className='bg-gray-100 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    { <div className='text-md font-semibold text-slate-100'>
                        Usuario - {auth?.nombre}
    
                    </div> }
                    
            
                    { <div>
                        <Link to='/landingpage' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg">Salir</Link>
                    </div> }
                </div>
                <div className='overflow-y-scroll p-2'>
                    <Outlet />
                </div>
                <div className='bg-blue-700 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
                </div>

            </div>



        </div>
    )
}
