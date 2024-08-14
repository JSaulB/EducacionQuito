import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthContext from "../context/AuthProvider";
import Mensaje from '../componets/Alerts';

export const Dashboard = () => {
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const initialValues = {
        nombre: auth?.nombre || "",
        apellido: auth?.apellido || "",
        direccion: auth?.direccion || "",
        telefono: auth?.telefono || ""
    };

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required('El nombre es obligatorio'),
        apellido: Yup.string()
            .required('El apellido es obligatorio'),
        direccion: Yup.string()
            .required('La dirección es obligatoria'),
        telefono: Yup.string()
            .matches(/^[0-9]+$/, 'El teléfono debe ser un número')
            .required('El teléfono es obligatorio')
    });

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const respuesta = await actualizarPerfil(values);
            setStatus({ success: true, message: 'Perfil actualizado con éxito' });
        } catch (error) {
            setStatus({ success: false, message: 'Hubo un error al actualizar el perfil' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/5 bg-gray-100 px-5 py-4'>
                <h2 className='text-4xl font-thin text-center text-slate-900'>BIENVENIDO</h2>
                <img src="https://cdn-icons-png.freepik.com/512/16/16480.png" alt="img-client" className="m-auto mt-8 p-1 border-8 border-slate-700 rounded-full" width={80} height={80} />
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Hola - {auth?.nombre} 🖐️</p>
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-red-600 w-3 h-3 inline-block rounded-full'></span> Modo - {auth?.rol}</p>
                <hr className="mt-5 border-slate-500" />

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status }) => (
                        <Form>
                            <div>
                                <h1 className='font-black text-2xl text-gray-900 text-center '>Mi Perfil</h1>
                                <hr className='my-4' />
                            </div>
                            {/* Campos de formulario */}
                            <div>
                                <label htmlFor='nombre' className='text-gray-100 uppercase font-bold text-sm'>Nombre: </label>
                                <Field id='nombre' name='nombre' type='text' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Nombre' />
                                <ErrorMessage name='nombre' component='div' className='text-red-500 text-sm' />
                            </div>
                            <div>
                                <label htmlFor='apellido' className='text-gray-100 uppercase font-bold text-sm'>Apellido: </label>
                                <Field id='apellido' name='apellido' type='text' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Apellido' />
                                <ErrorMessage name='apellido' component='div' className='text-red-500 text-sm' />
                            </div>
                            <div>
                                <label htmlFor='direccion' className='text-gray-100 uppercase font-bold text-sm'>Dirección: </label>
                                <Field id='direccion' name='direccion' type='text' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Dirección' />
                                <ErrorMessage name='direccion' component='div' className='text-red-500 text-sm' />
                            </div>
                            <div>
                                <label htmlFor='telefono' className='text-gray-100 uppercase font-bold text-sm'>Teléfono: </label>
                                <Field id='telefono' name='telefono' type='text' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-2' placeholder='Teléfono' />
                                <ErrorMessage name='telefono' component='div' className='text-red-500 text-sm' />
                            </div>
                            <div className="flex justify-center items-center">
                                <button type='submit' className="bg-green-600 p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all" disabled={isSubmitting}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                                </button>
                            </div>
                            {status && <Mensaje tipo={status.success ? 'success' : 'error'}>{status.message}</Mensaje>}
                        </Form>
                    )}
                </Formik>
            </div>

            <div className='flex-1 flex flex-col justify-between h-screen'>
                <div className='bg-gray-100 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div>
                        <Link to='/landingpage' className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-600 px-4 py-1 rounded-lg">Salir</Link>
                    </div>
                </div>

                <div className='pt-4 pb-80 overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
