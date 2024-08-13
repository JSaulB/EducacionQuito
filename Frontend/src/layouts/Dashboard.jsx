import { Link, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from '../componets/Alerts';


export const Dashboard = () => {
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({})

    console.log(auth);
    
    const [form,setform]=useState({nombre: "" ,apellido:"",direccion:"", telefono:""}) 
    const handleChange = (e) => {
        setform({
            ...form, // Copia del estado
            [e.target.name]: e.target.value // Nombre: "valor"
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta= await actualizarPerfil(form)
    };

    



    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/5 bg-gray-100 px-5 py-4'>
                <h2 className='text-4xl font-thin text-center text-slate-900'>BIENVENIDO</h2>
                <img src="https://cdn-icons-png.freepik.com/512/16/16480.png" alt="img-client" className="m-auto mt-8 p-1 border-8 border-slate-700 rounded-full" width={80} height={80} />
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Hola - {auth?.nombre} 🖐️</p> 
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-red-600 w-3 h-3 inline-block rounded-full'></span> Modo - {auth?.rol}</p>
                <hr className="mt-5 border-slate-500" />

                <form onSubmit={handleSubmit}>
                    <div> 
                        <h1 className='font-black text-2xl text-gray-900 text-center '>Mi Perfil</h1>
                        <hr className='my-4' />
                    </div>
                    {/* Campos de formulario */}
                    <div>
                        <label htmlFor='nombre' className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
                        <input id='nombre' type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Nombre' name='nombre' value={form?.nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='apellido' className='text-gray-100 uppercase font-bold text-sm'>Apellido: </label>
                        <input  id='apellido' type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Apellido' name='apellido' value={form?.apellido} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='direccion' className='text-gray-100 uppercase font-bold text-sm'>Dirección: </label>
                        <input id='direccion' type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Dirección' name='direccion' value={form?.direccion} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='telefono' className='text-gray-100 uppercase font-bold text-sm'>Dirección: </label>
                        <input id='telefono' type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Teléfono' name='telefono' value={form?.telefono} onChange={handleChange} />
                    </div>
                    {/* <div>
                        <label htmlFor='modo' className='text-gray-100 uppercase font-bold text-sm'>Modo: </label>
                        <textarea id='modo' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' name='modo' />
                    </div> */}
                    <div className="flex justify-center items-center">
                        <input 
                            type="submit" 
                            className="bg-green-600 p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                            value="Actualizar" 
                        />
                    </div>

                </form>
                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>} 
            </div>

            <div className='flex-1 flex flex-col justify-between h-screen'>
                <div className='bg-gray-100 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    {/* <div className='text-md font-semibold text-slate-100'>
                        Usuario - {auth?.nombre}
                    </div> */}
                    <div>
                        <Link to='/landingpage' className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-600 px-4 py-1 rounded-lg">Salir</Link>
                    </div>
                </div>

                {/* Reducir el padding o margen superior aquí */}
                <div className='pt-4 pb-80 overflow-auto'> 
                    <Outlet />
                </div>

                {/* Si tienes un footer, podrías agregarlo aquí */}
                {/* <div className='bg-blue-700 h-12'>
                    <p className='text-center text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
                </div> */}
            </div>
        </div>
    );
    
}
