import { Ciudadania } from '../models/ciudadania.js';
import { Institucion, Alumno, Ayuda } from '../models/ministerio.js';
import bcrypt from 'bcryptjs';
import generarJWT from '../helpers/crearJWT.js';
import {sendMailToUser} from '../config/nodemailer.js';

const registroCiudadania = async (req, res) => {
  // Actividad 1 (Request)
  const { nombre, apellido, email, password, confirmEmail } = req.body;

  // Actividad 2 (Validaciones)
  if (!nombre || !apellido || !email || !password || !confirmEmail) {
    return res.status(400).json({ error: 'Lo sentimos pero faltan datos' });
  }

  // Verificar si el email ya existe
  const verificarEmailBDD = await Ciudadania.findOne({ email });
  if (verificarEmailBDD) {
    return res.status(400).json({ error: 'Lo sentimos pero el email ya existe' });
  }

  // Actividad 3 (Guardar en BDD)
  const nuevoCiudadano = new Ciudadania({
    nombre,
    apellido,
    email,
    password: await bcrypt.hash(password, 10),
    confirmEmail: false
  });

  const token = nuevoCiudadano.crearToken();
  await nuevoCiudadano.save();
  sendMailToUser(email, token);

  // Actividad 4 (Respuesta)
  res.status(200).json({ msg: 'Nuevo usuario registrado, por favor confirma tu email' });
};

const loginCiudadania = async (req, res) => {
  // Actividad 1 (Request)
  const { email, password } = req.body;

  // Actividad 2 (Validaciones)
  if (!email || !password) {
    return res.status(400).json({ error: 'Lo sentimos, debes llenar todos los campos' });
  }

  try {
    // Validar el email
    const ciudadania = await Ciudadania.findOne({ email });
    if (!ciudadania) {
      return res.status(404).json({ error: 'Lo sentimos, el email no existe' });
    }

    // Validar confirmación de la cuenta
    if (!ciudadania.confirmEmail) {
      return res.status(403).json({ error: 'Lo sentimos, debes verificar tu cuenta' });
    }

    // Validar la contraseña
    const isMatch = await bcrypt.compare(password, ciudadania.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'La contraseña no es correcta' });
    }

    // Generar el token
    const token = generarJWT(ciudadania._id, 'ciudadano');

    // Devolver la respuesta
    const { nombre, apellido, _id } = ciudadania;
    res.status(200).json({
      token,
      nombre,
      apellido,
      _id,
      email: ciudadania.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
// Endpoint para registro de nuevo alumno
const registrarNuevoAlumno = async (req, res) => {
    // Actividad 1 (Request)
    const { nombre, calificacion, institucionId } = req.body;

    // Actividad 2 (Validaciones)
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({ error: 'Lo sentimos pero faltan datos' });
    }

    try {
        // Validar si la institución existe
        const institucion = await Institucion.findById(institucionId);
        if (!institucion) {
            return res.status(404).json({ error: 'Lo sentimos, la institución no existe' });
        }

        // Actividad 3 (Guardar en BDD)
        const nuevoAlumno = new Alumno({
            nombre,
            calificacion
        });
        await nuevoAlumno.save();

        // Actividad 4 (Respuesta)
        res.status(200).json({ msg: 'Alumno registrado correctamente', alumno: nuevoAlumno });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
const obtenerCategoriaInstitucion = async (req, res) => {
    const { id } = req.params; 

    try {
        const institucion = await Institucion.findById(id);

        if (!institucion) {
            return res.status(404).json({ error: 'Institución no encontrada' });
        }

        // Devolvemos solo la categoría de la institución
        res.status(200).json({ categoria: institucion.categoria });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


// Endpoint para solicitar ayuda a una institución y otorgar becas a alumnos destacados
const solicitarAyudaYBecas = async (req, res) => {
    // Actividad 1 (Request)
    const { institucionId, tipoAyuda, cantidad, alumnos } = req.body;

    try {
        // Validar si la institución existe
        const institucion = await Institucion.findById(institucionId);
        if (!institucion) {
            return res.status(404).json({ error: 'Lo sentimos, la institución no existe' });
        }

        // Registrar la ayuda
        const nuevaAyuda = new Ayuda({
            institucionId,
            tipoAyuda,
            cantidad
        });
        await nuevaAyuda.save();

        // Otorgar becas a los alumnos destacados
        const promises = alumnos.map(async (alumnoId) => {
            const alumno = await Alumno.findById(alumnoId);
            if (!alumno) {
                return res.status(404).json({ error: 'Alumno no encontrado' });
            }
            alumno.becas.push({ monto: 1000 }); // Ejemplo de monto de beca, ajustar según criterios
            await alumno.save();
        });

        await Promise.all(promises);

        // Actividad 4 (Respuesta)
        res.status(200).json({ msg: 'Solicitud de ayuda y becas registrada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export {
    registroCiudadania,
    loginCiudadania,
    obtenerCategoriaInstitucion,
    registrarNuevoAlumno,
    solicitarAyudaYBecas
};
