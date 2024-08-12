/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'
import Mensaje from '../componets/Alerts'


export const Login =() =>{
  // Consumir el contexto
  const {auth,data, setAuth} = useContext(AuthContext)
    
  // Crear un estado para el formulario
  const [form, setForm] = useState({
      email: "",
      password: "",
      modo:"Administrador"
  })

  console.log(form);
  console.log(form.modo);
  const [mensaje, setMensaje] = useState({})

  const navigate = useNavigate()

  // Funcion para manejar el cambio de los valores del estado
  const handleChange = (e) => {
      setForm({...form,
          [e.target.name]:e.target.value
      })
  }

  const handleSubmit = async(e) => { 
      e.preventDefault()
      
      try {
        //const url1 = form.password.includes("Min") ? `${import.meta.env.VITE_BACKEND_URL}/ministerio/login` : `${import.meta.env.VITE_BACKEND_URL}/loginadmin`
        //   const url = `${import.meta.env.VITE_BACKEND_URL}/loginadmin`
        //   const respuesta= await axios.post(url,form)
        const url1 = form.modo ==="Administrador" ? `${import.meta.env.VITE_BACKEND_URL}/loginadmin`:`${import.meta.env.VITE_BACKEND_URL}/ministerio/login`
          const respuesta= await axios.post(url1,form)
          // Obtener un token y guardarlo en el localStorage
          localStorage.setItem('token',respuesta.data.data.token)
          console.log(respuesta.data.data.token)
          setAuth(respuesta.data.data)
          navigate('/dashboard')
      } catch (error) {
          console.log(error)
          setMensaje({respuesta:error.response.data.error,tipo:false})
      }
  }
  

  return (
    <>
        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
                />
                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-white -500">INICIO DE SESIÓN</h1>
                <small className=" underline  text-gray-00 block my-4 text-sm">Ingresa tus datos correctamente</small>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='mb-2 block text-sm font-semibold' htmlFor="Modo">Modo</label>
                        <select className='block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500' 
                        name="modo" id="modo" value={form.modo} // Sincroniza el valor seleccionado con el estado
                        onChange={handleChange}>
                            <option value="Administrador">Administrador</option>
                            <option value="Ministerio">Ministerio</option>
                            <option value="Ciudadanía">Ciudadanía</option>
                        </select> 
                    </div>
                    
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Email</label>
                        <input 
                            type="email" 
                            name='email'
                            value={form.email || ""}
                            onChange={handleChange}
                            placeholder="Enter you email"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Password</label>
                        <input 
                            type="password"
                            name='password'
                            value={form.password || ""}
                            onChange={handleChange}
                            placeholder="********************"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                        />
                    </div>

                    <div className="my-4">
                        <button
                            className="py-2 w-full block text-center bg-blue-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-900 hover:text-white"
                        >
                            Login
                        </button>
                    </div>

                </form>

                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                    <hr className="border-gray-400" />
                    {/* <p className="text-center text-sm">OR</p> */}
                    <hr className="border-gray-400" />
                </div>

                {/* <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-black hover:text-white">
                    <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" />
                    Sign in with Google
                </button>

                <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-blue-600 hover:text-white">
                    <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" />
                    Sign in with Google
                </button> */}

                <div className="mt-5 text-xs border-b-2 py-4 ">
                    <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">Olvidaste tu Contraseña?</Link>
                </div>

                <div className="mt-3 text-sm flex justify-between items-center">
                    <p> ¿Aun no tienes una Cuenta?</p>
                    <Link to="/Registro" className="py-2 px-5 bg-green-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-green-900 hover:text-white">Registrar</Link>

                </div>


            </div>
        </div>
    </>
) 
    
}