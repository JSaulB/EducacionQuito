import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Mensaje from "./Alerts";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Formulario = ({ institucion }) => {
    const location = useLocation();
    const urlActual = location.pathname;
    const [mensajeBoton, setMensajeBoton] = useState('');
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});

    const initialValues = {
        nombre: institucion?.institucion?.nombre ?? "",
        direccion: institucion?.institucion?.direccion ?? "",
        email: institucion?.institucion?.email ?? "",
        telefono: institucion?.institucion?.telefono ?? "",
        descripcion: institucion?.institucion?.descripcion ?? "",
        categoria: institucion?.institucion?.categoria ?? "",
        Nestudiantes: institucion?.institucion?.Nestudiantes ?? "",
        Infraestructura: institucion?.institucion?.Infraestructura ?? "",
        socieconomico: institucion?.institucion?.socieconomico ?? ""
    };

    useEffect(() => {
        const textoBoton = () => {
            if (urlActual === "/dashboard/listaInstituciones") {
                setMensajeBoton("Registrar Ayuda");
            } else if (urlActual === "/dashboard/crear") {
                setMensajeBoton("Registrar Institución");
            } else if (urlActual === "/dashboard/actualizar") {
                setMensajeBoton("Actualizar Institución");
            }
        };
        textoBoton();
    }, [urlActual]);

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre es requerido'),
        direccion: Yup.string().required('La dirección es requerida'),
        email: Yup.string().email('Email inválido').required('El email es requerido'),
        telefono: Yup.string().matches(/^[0-9]+$/, "Sólo se permiten números").required('El teléfono es requerido'),
        categoria: Yup.string().required('La categoría es requerida'),
        Infraestructura: Yup.string().required('La infraestructura es requerida'),
        Nestudiantes: Yup.number().typeError('Debe ser un   número').required('El número de estudiantes es requerido'),
        socieconomico: Yup.string().required('El historial socioeconómico es requerido')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${process.env.VITE_BACKEND_URL}/creari`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(url, values, options);
            setMensaje({
                respuesta: "Institución registrada con éxito, para el análisis",
                tipo: true
            });
            setTimeout(() => {
                navigate('/dashboard/listaInstituciones');
            }, 3000);
            console.log(response);
        } catch (error) {
            console.log(error);
            setMensaje({
                respuesta: error.response.data.msg,
                tipo: false
            });
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <div>
                        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre de la Institución: </label>
                        <Field
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                            placeholder="Ingrese el nombre de la Institución"
                        />
                        <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="direccion" className="text-gray-700 uppercase font-bold text-sm">Dirección: </label>
                        <Field
                            id="direccion"
                            name="direccion"
                            type="text"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                            placeholder="Ingrese la dirección"
                        />
                        <ErrorMessage name="direccion" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="telefono" className="text-gray-700 uppercase font-bold text-sm">Teléfono: </label>
                        <Field
                            id="telefono"
                            name="telefono"
                            type="tel"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                            placeholder="Ingrese el teléfono"
                        />
                        <ErrorMessage name="telefono" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">Email: </label>
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                            placeholder="Ingrese el email"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="categoria" className="text-gray-700 uppercase font-bold text-sm">Categoría: </label>
                        <Field
                            as="select"
                            id="categoria"
                            name="categoria"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                        >
                            <option value="" disabled hidden>Seleccione el nivel de educación</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </Field>
                        <ErrorMessage name="categoria" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="Infraestructura" className="text-gray-700 uppercase font-bold text-sm">Infraestructura: </label>
                        <Field
                            as="select"
                            id="Infraestructura"
                            name="Infraestructura"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                        >
                            <option value="" disabled hidden>Seleccione el estado de la infraestructura</option>
                            <option value="Muy Buena">Muy Buena</option>
                            <option value="Buena">Buena</option>
                            <option value="Regular">Regular</option>
                            <option value="Mala">Mala</option>
                        </Field>
                        <ErrorMessage name="Infraestructura" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="Nestudiantes" className="text-gray-700 uppercase font-bold text-sm">N° Estudiantes: </label>
                        <Field
                            id="Nestudiantes"
                            name="Nestudiantes"
                            type="text"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                            placeholder="Número de estudiantes"
                        />
                        <ErrorMessage name="Nestudiantes" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="socieconomico" className="text-gray-700 uppercase font-bold text-sm">Historial Socioeconómico: </label>
                        <Field
                            as="select"
                            id="socieconomico"
                            name="socieconomico"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                        >
                            <option value="" disabled hidden>Seleccione el estado socioeconómico</option>
                            <option value="Alto">Alto</option>
                            <option value="Medio-Alto">Medio-Alto</option>
                            <option value="Medio">Medio</option>
                            <option value="Medio-Bajo">Medio-Bajo</option>
                            <option value="Bajo">Bajo</option>
                        </Field>
                        <ErrorMessage name="socieconomico" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripción: </label>
                        <Field
                            id="descripcion"
                            name="descripcion"
                            as="textarea"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                            placeholder="Descripción de la Institución"
                        />
                        <ErrorMessage name="descripcion" component="div" className="text-red-600 text-sm" />
                    </div>

                    <input
                        type="submit"
                        value={mensajeBoton}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
                        disabled={isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
};

Formulario.propTypes = {
    institucion: PropTypes.object
};
