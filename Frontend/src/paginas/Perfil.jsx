export const Perfil = () => {
    return (

        <form>

            <div> 
                <h1 className='font-black text-4xl text-gray-100'>Perfil</h1>
                <hr className='my-4' />
                <p className='mb-8'>Visualizar Perfil</p>
            </div>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                />
            </div>

            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-100 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                />
            </div>

            <input
                type="submit"
                className='bg-green-600 w-m p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                value='Actualizar' />

        </form>
    )
}
