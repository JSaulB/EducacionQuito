import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Mensaje from '../componets/Alerts';

export const RegistroMinisterio = () => {
  const [mensaje, setMensaje] = useState({}); // Estado para los mensajes de error o éxito

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio'),
    direccion: Yup.string()
      .required('La dirección es obligatoria'),
    email: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/ministerio/register`;
      const respuesta = await axios.post(url, { ...values, rol: "Ministerio" });
      setMensaje({
        respuesta: respuesta.data.msg,
        tipo: true
      });
      console.log(respuesta.data.msg);
    } catch (error) {
      console.log(error);
      setMensaje({
        respuesta: error.response.data.msg,
        tipo: false
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://www.65ymas.com/uploads/s1/36/42/51/bigstock-internet-security-firewall-or-326464240.jpeg"
          className="m-auto mt-4 p-1 border-2 border-slate-4000 rounded-full"
          width={80}
          height={80}
        />

        <div className="md:w-4/5 sm:w-full">
          {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-white mt-6">Entidad Ministerio</h1>
          <small className="text-gray-400 block my-7 text-m underline">Modo-Ministerio</small>

          <Formik
            initialValues={{
              nombre: '',
              direccion: '',
              email: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Nombre de Usuario:</label>
                  <Field
                    type="text"
                    name="nombre"
                    placeholder="Ingresa tu nombre"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Dirección:</label>
                  <Field
                    type="text"
                    name="direccion"
                    placeholder="Ingresa tu dirección"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="direccion" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-sm font-semibold">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Ingresa tu correo electrónico"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-green-900 hover:text-white"
                  >
                    {isSubmitting ? 'Registrando...' : 'Registrar Usuario'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>
  );
}
