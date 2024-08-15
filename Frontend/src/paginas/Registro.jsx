import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Mensaje from '../componets/Alerts';

export const Registro = () => {
  const [mensaje, setMensaje] = useState({});

  const validationSchema = Yup.object({
    nombre: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "El nombre solo puede contener letras")
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(10, "El nombre no puede tener más de 10 caracteres")
    .required("El nombre es requerido"),
    apellido: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "El apellido solo puede contener letras")
    .min(2, "El apellido debe tener al menos 5 caracteres")
    .max(10, "El apellido no puede tener más de 10 caracteres")
    .required("El apellido es requerido"),
    direccion: Yup.string().required('La dirección es obligatoria'),
    telefono: Yup.string()
      .matches(/^[0-9]+$/, 'El teléfono debe ser un número')
      .required('El teléfono es obligatorio'),
    email: Yup.string()
      .email('Debe ser un email válido')
      .required('El email es obligatorio'),
    password: Yup.string()
      .min(4, 'La contraseña debe tener al menos 4 caracteres')
      .required('La contraseña es obligatoria'),
  });

  // Manejo del envío del formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/registroadmin`;
      const respuesta = await axios.post(url, values);
      setMensaje({
        respuesta: respuesta.data.msg,
        tipo: true,
      });
      resetForm(); 
    } catch (error) {
      setMensaje({
        respuesta: error.response.data.msg,
        tipo: false,
      });
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="EduScholar"
          src=".\src\assets\pngegg.png"
          className="mx-auto h-10 w-auto"
        />

        <div className="md:w-4/5 sm:w-full">
          {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-white">REGISTRO</h1>
          <small className="text-gray-300 block my-4 text-sm">INGRESA TODOS LOS DATOS CORRECTAMENTE</small>

          <Formik
            initialValues={{
              nombre: '',
              apellido: '',
              direccion: '',
              telefono: '',
              email: '',
              password: '',
              tipo: 'Administrador',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Nombre:</label>
                  <Field
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ingresa tu nombre"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Apellido:</label>
                  <Field
                    type="text"
                    id="apellido"
                    name="apellido"
                    placeholder="Ingresa tu apellido"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Dirección:</label>
                  <Field
                    type="text"
                    id="direccion"
                    name="direccion"
                    placeholder="Ingresa tu dirección"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="direccion" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Teléfono:</label>
                  <Field
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="Ingresa tu teléfono"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Email:</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingresa tu email"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Contraseña:</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********************"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-green-900 hover:text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-5 text-xs border-b-2 py-4"></div>

          <div className="mt-3 text-sm flex justify-between items-center">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login" className="py-2 px-5 bg-green-500 text-slate-100 border rounded-xl hover:scale-120 duration-300 hover:bg-green-900">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

