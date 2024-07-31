import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Mensaje from '../componets/Alertas'

export const Registro = () => {
  const [mensaje, setMensaje] = useState({}); //paso 4 alertar
  const [form, setForm] = useState({//Paso 1 capturar los datos del formulario
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        email: '',
        password: ""
  }); // Estado del formulario (vacío al principio)

  console.log(form); // Mostrar en consola el estado del formulario

    const handleChange = (e) => { // Paso 2 Función para manejar los cambios en los inputs
        setForm({...form, // Copiar el estado actual
            [e.target.name]:e.target.value // Cambiar el valor del input en el estado
        })
    }
    // Función para enviar los datos del formulario
    const handleSubmit = async(e) => { 
            // Prevención de recarga de la página al enviar el formulario
            e.preventDefault();
            // Manejo de errores en el envío de datos
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
                const respuesta = await axios.post(url,form)
                setMensaje({
                    respuesta:respuesta.data.msg,
                    tipo:true
                })
                console.log(respuesta.data.msg);
            } catch (error) {
                console.log( error);
                setMensaje({
                    respuesta:error.response.data.msg,
                    tipo:false
                })
            }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex justify-center items-center w-1/2 p-5 shadow-lg rounded-lg">
        <div className="md:w-4/5 sm:w-full">
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">BIENVENIDO</h1>
          <small className="text-gray-400 block my-4 text-sm">INGRESA TODOS LOS DATOS PARA PODER SEGUIR CON EL REGISTRO</small>

          <form>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Nombre *</label>
              <input 
              type="text" 
              id="nombre"
              name='nombre'
              onChange={handleChange}
              value={form.nombre || ""}
              placeholder="Enter your name" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Apellido</label>
              <input type="name" placeholder="Enter your lastname" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Dirección </label>
              <input type="address" placeholder="Enter your address" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Email *</label>
              <input type="email" placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Password *</label>
              <input type="password" placeholder="********************" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            </div>

            <div className="mb-3">
              <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Registrarse</button>
            </div>
          </form>

          <div className="mt-5 text-xs border-b-2 py-4"></div>

          <div className="mt-3 text-sm flex justify-between items-center">
            <p>Ya tinenes una cuenta? iniciar sesión</p>
            <Link to="/login" className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 ">Login</Link>

          </div>
        </div>
      </div>
    </div>
  );
}
