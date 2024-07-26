import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import generarJWT from '../helpers/crearJWT.js'
import { Ciudadania } from '../models/ciudadania.js'
import { sendMailToUserCiudadania } from '../config/nodemailer.js'
import  Ayuda  from "../models/ayuda.js"
import administrador from '../models/administrador.js'
import { institucion1 as Institucion, Estudiante } from "../models/administrador.js"

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
  
  sendMailToUserCiudadania(email, token);

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
  ciudadania.confirmationToken = null; 
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
  const { nombre, apellido, institucion, historialSocioeconomico } = req.body;

  if (!nombre || !apellido || !institucion || !historialSocioeconomico) { //Datos  a traves de req.body, nombre de la institucion no id
    return res.status(400).json({ error: 'Lo sentimos, faltan datos obligatorios' });
  }

  try {
    const nuevaInstitucion = await Institucion.findOne({ nombre: institucion });
    if (!nuevaInstitucion) {
      return res.status(404).json({ error: 'Lo sentimos, la institución no existe' });
    }

    const nuevoAlumno = new Estudiante({
      nombre,
      apellido,
      institucion: nuevaInstitucion._id,
      historialSocioeconomico
    });
    await nuevoAlumno.save();

    res.status(200).json({ msg: 'Alumno registrado correctamente', alumno: nuevoAlumno });
  } catch (error) {
    console.error("Error al registrar nuevo alumno:", error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
const obtenerCategoriaInstitucion = async (req, res) => {
  try {
    const instituciones = await Institucion.find();
    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const solicitarAyudaYBecas = async (req, res) => {
  const { institucion, descripcion, monto } = req.body;  //Datos  a traves de req.body, nombre de la institucion no id

  if (!institucion || !descripcion || !monto ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const nuevaInstitucion = await Institucion.findOne({ nombre: institucion });
    if (!nuevaInstitucion) {
      return res.status(404).json({ error: 'Lo sentimos, la institución no existe' });
    }

    const nuevaAyuda = new Ayuda({
      institucion: nuevaInstitucion._id,
      descripcion,
      monto
    });
    await nuevaAyuda.save();

    const promises = alumnos.map(async (alumnoId) => {
      const alumno = await Estudiante.findById(alumnoId);
      if (!alumno) {
        throw new Error(`Alumno no encontrado: ${alumnoId}`);
      }
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
};


export {
  registroCiudadania,
  loginCiudadania,
  obtenerCategoriaInstitucion,
  registrarNuevoAlumno,
  solicitarAyudaYBecas,
  confirmarEmail
};