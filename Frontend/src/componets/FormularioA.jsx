import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Mensaje from "./Alerts";
import axios from "axios";

export const Formulario = ({ institucion }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});

    const [form, setForm] = useState({
        nombre: institucion?.nombre ?? "",
        direccion: institucion?.direccion ?? "",
        email: institucion?.email ?? "",
        telefono: institucion?.telefono ?? "", 
        descripcion: institucion?.descripcion ?? "",
        categoria: institucion?.categoria ?? "",
        Nestudiantes: institucion?.Nestudiantes ?? "",
        Infraestructura: institucion?.Infraestructura ?? "",
        socieconomico: institucion?.socieconomico ?? ""
    });
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => { 
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/actualizari/${institucion._id}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.put(url, form, options) 
            setMensaje({ 
                respuesta: institucion ? "Institución actualizada con éxito." : "Institución registrada con éxito.",
                tipo: true
            });
            
            setTimeout(() => {
                navigate('/dashboard/listaInstituciones');
            }, 3000);
        } catch (error) {
            console.log(error);
            setMensaje({ 
                respuesta: error.response?.data?.msg || "Hubo un error al procesar la solicitud.",
                tipo: false 
            });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}    
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la Institucion: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese el nombre de la Institucion'
                    name='nombre'
                    onChange={handleChange}
                    value={form.nombre || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese la direccion'
                    name='direccion'
                    onChange={handleChange}
                    value={form.direccion || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <input
                    id='telefono'
                    type="tel"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese el telefono'
                    name='telefono'
                    onChange={handleChange}
                    value={form.telefono || ""}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese el email'
                    name='email'
                    onChange={handleChange}
                    value={form.email || ""}
                />
            </div>
            <div>
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
                    Categoría:
                </label>
                <select
                    id="categoria"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    name="categoria"
                    value={form.categoria || ""}
                    onChange={handleChange}
                >
                    <option value="" disabled hidden>
                    Seleccione el nivel de educacion
                    </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>


            <div>
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
                    Infraestructura:
                </label>
                <select
                    id='Infraestructura'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Estado de la Infraestructura'
                    name='Infraestructura'
                    onChange={handleChange}
                    value={form.Infraestructura || ""}
                >
                    <option value="" disabled hidden>
                    Seleccione el estado de la Infraestructura
                    </option>
                    <option value="Muy Buena">Muy Buena</option>
                    <option value="Buena">Buena</option>
                    <option value="Regular">Regular</option>
                    <option value="Mala">Mala</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>N° Estudiantes: </label>
                <input
                    id='Nestudiantes'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Número de estudiantes'
                    name='Nestudiantes'
                    onChange={handleChange}
                    value={form.Nestudiantes || ""}
                />
            </div>
        

            <div>
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
                    Historial Socieconomico:
                </label>
                <select
                    id='socieconomico'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Promedio socieconomico'
                    name='socieconomico'
                    onChange={handleChange}
                    value={form.socieconomico || ""}
                >
                    <option value="" disabled hidden>
                    Seleccione el estado de socieconomico
                    </option>
                    <option value="Alto">Alto</option>
                    <option value="Medio-Alto">Medio-Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Medio-Bajo">Medio-Bajo</option>
                    <option value="Bajo">Bajo</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-700 uppercase font-bold text-sm'>Observaciones: </label>
                <textarea
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='descripcion'
                    onChange={handleChange}
                    value={form.descripcion || ""}
                />
            </div>

            <input
                type="submit"
                className='bg-green-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
        value={'Actualizar'}
        /> 
        </form>
    )
}

Formulario.propTypes = {
        institucion: PropTypes.shape({
            nombre: PropTypes.string,
            direccion: PropTypes.string,
            email: PropTypes.string,
            telefono: PropTypes.string,
            descripcion: PropTypes.string,
            categoria: PropTypes.string,
            Nestudiantes: PropTypes.string,
            Infraestructura: PropTypes.string,
            socieconomico: PropTypes.string
        })

};