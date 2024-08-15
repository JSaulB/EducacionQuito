import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Mensaje from './Alerts';

const FormularioAyuda = () => {
    const { id } = useParams();
    const [institucionId, setInstitucionId] = useState('');
    const [institucionNombre, setInstitucionNombre] = useState('');
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const obtenerInstitucion = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/institucion/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(url, options);
                setInstitucionId(response.data._id);  // Guardar el ObjectId
                setInstitucionNombre(response.data.nombre);  // Guardar el nombre para mostrar
            } catch (error) {
                console.error('Error al obtener la institución:', error);
            }
        };

        obtenerInstitucion();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            institucion: institucionId || '',
            descripcion: '',
            monto: ''
        },
        validationSchema: Yup.object({
            descripcion: Yup.string()
                .max(200, 'La descripción no puede tener más de 200 caracteres')
                .required('La descripción es requerida'),
            monto: Yup.number()
                .required('El monto es requerido')
                .positive('El monto debe ser un número positivo')
                .integer('El monto debe ser un número entero'),
        }),
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/ayuda`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.post(url, values, options);
                setMensaje({
                    respuesta: respuesta.data.msg,
                    tipo: true,
                  });
                console.log('Respuesta del servidor:', response.data);
            } catch (error) {
                console.error('Error al enviar la solicitud de ayuda:', error);
                setMensaje({
                    respuesta: respuesta.data.error,
                    tipo: true,
                  });
            }
        },
    });

    useEffect(() => {
        if (institucionId) {
            formik.setFieldValue('institucion', institucionId);
        }
    }, [institucionId]);

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <h2 className="text-2xl font-bold mb-6">Registrar de Ayuda para {institucionNombre}</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                    Descripción
                </label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.descripcion}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.descripcion && formik.errors.descripcion ? 'border-red-500' : ''}`}
                />
                {formik.touched.descripcion && formik.errors.descripcion ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.descripcion}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
                    Monto
                </label>
                <input
                    id="monto"
                    name="monto"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.monto}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.monto && formik.errors.monto ? 'border-red-500' : ''}`}
                />
                {formik.touched.monto && formik.errors.monto ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.monto}</div>
                ) : null}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Enviar Solicitud
            </button>
        </form>
    );
};

export default FormularioAyuda;
