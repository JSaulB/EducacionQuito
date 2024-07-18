import { Ciudadania } from '../models/ciudadania.js';
import { Institucion, Alumno, Ayuda } from '../models/ministerio.js';
import bcrypt from 'bcryptjs';
import generarJWT from '../helpers/crearJWT.js';
import { sendMailToUser } from '../config/nodemailer.js';
import { Estudiante, institucion1 } from '../models/administrador.js';

const registroCiudadania = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Lo sentimos, faltan datos obligatorios' });
  }

  const verificarEmailBDD = await Ciudadania.findOne({ email });
  if (verificarEmailBDD) {
    return res.status(400).json({ error: 'Lo sentimos, el email ya existe' });
  }

  const token = generarJWT({ email });

  const nuevoRegistroCiudadania = new Ciudadania({
    nombre,
    apellido,
    email,
    password: await bcrypt.hash(password, 10),
    confirmEmail: false,
    confirmationToken: token
  });

  await nuevoRegistroCiudadania.save();
  
  sendMailToUser(email, token);

  res.status(200).json({ msg: 'Nuevo registro de ciudadanía creado correctamente' });
};


const confirmarEmail = async (req, res) => {
  const { token } = req.params;

  const ciudadania = await Ciudadania.findOne({ confirmationToken: token });
  if (!ciudadania) {
    return res.status(404).json({ error: 'El token no es válido' });
  }
  
  if (ciudadania.confirmEmail) {
    return res.status(400).json({ msg: 'La cuenta ya ha sido confirmada' });
  }

  ciudadania.confirmEmail = true;
  ciudadania.confirmationToken = null; // Clear the token after confirmation
  await ciudadania.save();
  
  res.status(200).json({ msg: 'El correo electrónico ha sido confirmado con éxito' });
};

const loginCiudadania = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Lo sentimos, debes llenar todos los campos' });
  }

  try {
    const ciudadania = await Ciudadania.findOne({ email });

    if (!ciudadania || !ciudadania.confirmEmail) {
      return res.status(403).json({ error: 'Lo sentimos, debes verificar tu cuenta' });
    }

    const isMatch = await bcrypt.compare(password, ciudadania.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'La contraseña no es correcta' });
    }

    const token = generarJWT(ciudadania._id, 'ciudadano');

    res.status(200).json({
      token,
      nombre: ciudadania.nombre,
      apellido: ciudadania.apellido,
      _id: ciudadania._id,
      email: ciudadania.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const registrarNuevoAlumno = async (req, res) => {
  const { nombre, calificacion, institucionId } = req.body;
  console.log(req.body);  

  // Validación de campos obligatorios
  if (!nombre || !calificacion ) {
      return res.status(400).json({ error: 'Lo sentimos, faltan datos obligatorios' });
  }

  try {
      // Validar si la institución existe
      const institucion = await institucion1.findById(institucionId);
      if (!institucion) {
          return res.status(404).json({ error: 'Lo sentimos, la institución no existe' });
      }
      // Crear un nuevo registro de alumno
      const nuevoAlumno = new Estudiante({
          nombre,
          calificacion,
          institucionId
      });
      await nuevoAlumno.save();

      // Responder con un mensaje de éxito
      res.status(200).json({ msg: 'Alumno registrado correctamente', alumno: nuevoAlumno });
  } catch (error) {
      res.status(500).json({ error: 'Error en el servidor' });
  }
};


const obtenerCategoriaInstitucion = async (req, res) => {
  try {
    const instituciones = await institucion1.find();
    res.json(instituciones);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

const solicitarAyudaYBecas = async (req, res) => {
  const { institucionId, tipoAyuda, cantidad, alumnos } = req.body;

  if (!institucionId || !tipoAyuda || !cantidad || !Array.isArray(alumnos) || alumnos.length === 0) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const institucion = await institucion1.findById(institucionId);
    if (!institucion) {
      return res.status(404).json({ error: 'Lo sentimos, la institución no existe' });
    }

    const nuevaAyuda = new Ayuda({
      institucionId,
      tipoAyuda,
      cantidad
    });
    await nuevaAyuda.save();

    const promises = alumnos.map(async (alumnoId) => {
      const alumno = await Estudiante.findById(alumnoId);
      if (!alumno) {
        throw new Error(`Alumno no encontrado: ${alumnoId}`);
      }
      // Verifica si alumno.becas existe y es un array antes de usar push
      if (!alumno.becas || !Array.isArray(alumno.becas)) {
        alumno.becas = [];
      }
      alumno.becas.push({ monto: 1000 });
      await alumno.save();
    });

    await Promise.all(promises);

    res.status(200).json({ msg: 'Solicitud de ayuda y becas registrada correctamente' });
  } catch (error) {
    console.error("Error al procesar la solicitud de ayuda y becas:", error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}



export {
  registroCiudadania,
  loginCiudadania,
  obtenerCategoriaInstitucion,
  registrarNuevoAlumno,
  solicitarAyudaYBecas,
  confirmarEmail
};

