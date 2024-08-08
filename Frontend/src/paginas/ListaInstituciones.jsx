import React from 'react'
import Tabla from '../componets/Tabla'

const ListaInstituciones = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>INSTITUCIONES DE LA CIUDAD DE QUITO</h1>
            <hr className='my-4' />
            <p className='mb-8'>Lista de instituciones</p>
            <Tabla/>
        </div>
    )
}

export default ListaInstituciones


