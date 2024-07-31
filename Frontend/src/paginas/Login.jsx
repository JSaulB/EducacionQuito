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
import Mensaje from '../componets/Alertas'


export const Login =() =>{
  // Consumir el contexto
  const {auth,data, setAuth} = useContext(AuthContext)
    
  // Crear un estado para el formulario
  const [form, setForm] = useState({
      email: "",
      password: ""
  })

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
          const url = `${import.meta.env.VITE_BACKEND_URL}/login`
          const respuesta= await axios.post(url,form)
          // Obtener un token y guardarlo en el localStorage
          localStorage.setItem('token',respuesta.data.token)
          
          navigate('/dashboard')
      } catch (error) {
          console.log(error)
          setMensaje({respuesta:error.response.data.msg,tipo:false})
      }
  }
  // Consumir el contexto

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Dirección de correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Te olvidaste la contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={form.password || ""}
                  onChange={handleChange}
                  placeholder="********************"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="my-4">
            <Link to="/dashboard" className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 ">Ingresar</Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No tienes cuenta?{' '}
            <a href="/registro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              registrate gratis
            </a>
          </p>
        </div>
      </div>
    </>
  )  
    
}