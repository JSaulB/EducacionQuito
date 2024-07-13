import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { sendMailToUser, sendMailToRecoveryPassword } from "../config/nodemailer.js";
import generarJWT from "../helpers/crearJWT.js";
import { Institucion, Alumno, Ayuda, User } from "../models/ministerio_models.js";

// Enpoint para el login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos vacíos
    if (!email || !password) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    try {
        // Validar el email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Lo sentimos, el email no existe" });
        }

        // Validar confirmación de la cuenta
        if (!user.confirmEmail) {
            return res.status(403).json({ msg: "Lo sentimos, debes verificar tu cuenta" });
        }

        // Validar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "La contraseña no es correcta" });
        }

        // Generar el token
        const token = generarJWT(user._id, "user"); // Cambia "user" por el rol correspondiente si es necesario

        // Devolver la respuesta
        const { nombre, apellido, direccion, telefono, _id } = user;
        res.status(200).json({
            token,
            nombre,
            apellido,
            direccion,
            telefono,
            _id,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Enpoint para visualizar detalle de la institución y su categoría
export const getInstituciones = async (req, res) => {
    try {
        const instituciones = await Institucion.find().sort({ calificacion: -1 });
        res.json(instituciones);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
};

// Endpoint para listar estudiantes y sus calificaciones
export const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Alumno.find().sort({ calificacion: -1 });
        res.json(estudiantes);
    } catch (err) {
        res.status(500).send('Error en el Servidor');
    }
};

// Registrar ayuda a la institución elegida y al niño con la beca más alta
export const registrarAyuda = async (req, res) => {
    const { institucionId, tipoAyuda, cantidad, alumnos } = req.body;
    try {
        const nuevaAyuda = new Ayuda({
            institucionId,
            tipoAyuda,
            cantidad
        });
        await nuevaAyuda.save();

        const promises = alumnos.map(async (alumnoId) => {
            const alumno = await Alumno.findById(alumnoId);
            if (!alumno) {
                return res.status(404).json({ msg: 'Alumno no encontrado' });
            }

            alumno.becas.push({ monto: 1000 }); // Suponiendo un monto fijo para la beca
            await alumno.save();
        });

        await Promise.all(promises);

        res.json({ mensaje: 'Ayuda y becas registradas', ayuda: nuevaAyuda });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
