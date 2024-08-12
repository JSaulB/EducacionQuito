import React from 'react'
import { FormularioEstudiante } from '../componets/Formestudiante'
export const CrearEstudiante = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              <h1 className='font-black text-gray-500 text-4xl'>REGISTRAR ESTUDIANTE</h1>
              <hr className='my-4'/>
              <FormularioEstudiante/>
          </div>
    </div>  
  )
}