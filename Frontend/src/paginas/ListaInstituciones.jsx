import React from 'react'
import Tabla from '../componets/Tabla'

const ListaInstituciones = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className='font-black text-4xl text-gray-100'>Instituciones de la ciudad de Quito</h1>
            <hr className='my-4' />
            <p className='mb-8 font-bold text-lg'>Lista de instituciones</p>
            <div className="w-full flex justify-center">
                <Tabla />
            </div>
        </div>
    )
}

export default ListaInstituciones


