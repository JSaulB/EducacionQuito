import logoDog from '../assets/luffyconfundido.jpeg'
import { Link } from 'react-router-dom'
export const NotAllowed = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">

            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Página no encontrada</p>
                
                <p className="md:text-lg lg:text-xl text-gray-200 mt-8">Lo siento pero la ruta que buscas no existe</p>


            </div>
            <div className="my-4">
                <button
                    className="py-3 w-full block text-center bg-blue-500 text-slate-200 border rounded-xl  duration-300 hover:bg-blue-900 hover:text-white">
                    <Link to={'/landingpage'}> Regresar al menú Principal</Link>
                </button>
            </div>
        </div>
    )
}