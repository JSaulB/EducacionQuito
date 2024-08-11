import React from 'react'
import { Formulario } from '../componets/Formulario'

export const CrearInstitucion = () => {
  return (
    <div className='flex p-4 mleff-8'>
      <div className='flex flex-col p-4 space-y-4'>
              
              <h1 className='font-black text-gray-500 text-4xl'>REGISTRAR INSTITUCIÓN</h1>
              <hr className='my-4'/>
              <Formulario/>
          </div>

        <div className='flex flex-col p-4 space-y-4'>
            
            <h1 className='font-black text-gray-500 text-4xl'>REGISTRAR ESTUDIANTES </h1>
            <hr className='my-4'/>
            <Formulario/>
        </div>

    </div>
        
        
  )
}

