import React from 'react';
import Tabla from '../componets/Tabla2';

const ListaInstituciones2 = () => {
    return (
    <div className="container mx-auto px-4 py-8">
        <h1 className='font-bold text-4xl text-white mb-4 text-center'>Elija la Institución que desea actualizar</h1>
        <hr className='my-6 border-gray-300' />
        <p className='mb-6 text-lg text-white text-center'>Lista de instituciones</p>
        <Tabla />
    </div>

    );
}

export default ListaInstituciones2;


