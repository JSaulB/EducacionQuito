import administrador from "../models/administrador.js"
import { institucion1 } from '../models/administrador.js';
import {Estudiante }from '../models/administrador.js';
import  Ayuda  from "../models/ayuda.js"
import { sendMailToUser, sendMailToRecoveryPassword} from "../config/nodemailer.js"
import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js";

const login = async (req,res)=>{
    // Actividad 1 (Request)
    const {email, password} = req.body;

    // Actividad 2 (Validaciones)
    //? Validar si los campos están vacíos
    if(Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos pero faltan datos'})
    }

    const adminBDD = await administrador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    //? Validar si el email existe
    //const adminBDD = await administrador.findOne({'email':email})

    //? Validar si el email está confirmado
    if (adminBDD?.confirmEmail === false){ // Si el email está confirmado (?.) operación de encadenamiento opcional (opcional chaining)
        return res.status(403).json({msg:'Lo sentimos, debes confirmar tu email'})
    }

    //? Validar si el email existe
    if (!adminBDD){
        return res.status(404).json({msg:'Lo sentimos, el email no existe'})
    }

    //? Validar si el password es correcto
    const validarPassword = await adminBDD.matchPassword(password)
    if (!validarPassword){
        return res.status(403).json({msg:'Lo sentimos, la contraseña es incorrecta'})
    }

    // Actividad 3 (Base de Datos)
    const token = generarJWT(adminBDD._id, 'Administrador')
    
    const {nombre, apellido, direccion, telefono, _id} = adminBDD

    // Actividad 4 (Respuesta)
    res.status(200).json({
        nombre, apellido, direccion, telefono, email:adminBDD.email, rol:"Administrador", _id, token
        
    })
}

const perfil = (req,res)=>{
    delete req.adminBDD.token // Eliminar el token
    delete req.adminBDD.confirmEmail // Eliminar el confirmEmail
    delete req.adminBDD.createdAt // Eliminar el createdAt
    delete req.adminBDD.updatedAt // Eliminar el updatedAt
    delete req.adminBDD.__v // Eliminar el __v
    console.log(req.adminBDD)
    res.status(200).json(req.adminBDD) // Responder con el veterinario
    
}

const registro = async (req,res)=>{
    //* Actividad 1 (Request)
    const {email,password} = req.body

    //* Actividad 2 (Validaciones)
    if(Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos completa los datos datos'})
    }
    const verificarEmailBDD = await administrador.findOne({email})
    if(verificarEmailBDD){
        return res.status(400).json({msg:'Lo sentimos, el email ya existe'})
    }

    //* Actividad 3 (Guardar en BDD)
    const nuevoadmin = new administrador(req.body)

    nuevoadmin.password = await nuevoadmin.encrypPassword(password)
    
    const token = nuevoadmin.crearToken()
    
    await nuevoadmin.save()
    sendMailToUser(email, token)
    //* Actividad 4 (Respuesta)
    res.status(200).json({msg:'Administrador registrado, por favor confirma tu email'})
}


const confirmEmail = async (req,res)=>{
    //* Actividad 1 (Validaciones)
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
        
        //* Actividad 2 (Buscar en BDD)
        const adminBDD = await administrador.findOne({token:req.params.token})
        if(!adminBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
        
        //* Actividad 3 (Guardar en BDD)
        adminBDD.token = null
        adminBDD.confirmEmail = true
        await adminBDD.save()
        
        //* Actividad 4 (Respuesta)
        res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"})
}

const listaradministradores = async (req, res) => {
    try {
        const admins = await administrador.find().select('-password -createdAt -updatedAt -__v');
        res.json(admins);
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
}
const detalleadministrador = async (req,res)=>{
    // Actividad 1 (Request)
    const {id} = req.params
    // Actividad 2 (Validaciones)
    //? Validar si el id es válido
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    //? Validar si el veterinario existe
    const adminBDD = await administrador.findById(id).select("-password")
    if(!adminBDD) return res.status(404).json({msg:`Lo sentimos, no existe el administrador ${id}`})
    // Actividad 3 (Respuesta)
    res.status(200).json({msg:adminBDD})
}
const actualizarPerfil = async (req,res)=>{
    // Actividad 1 (Request)
    const {id} = req.params
    const {nombre, apellido, direccion, telefono} = req.body
    // Actividad 2 (Validaciones)
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos pero faltan datos'})
    }
    //? Validar si el email existe
    const adminBDD = await administrador.findOne({id})
    if (!adminBDD){
        return res.status(404).json({msg:'Lo sentimos, el email no existe'})
    }
    //? Validar si la informacion es la misma
    const userInfo = {
        nombre:adminBDD.nombre,
        apellido:adminBDD.apellido,
        direccion:adminBDD.direccion,
        telefono:adminBDD.telefono
    }
    if (JSON.stringify(userInfo) === JSON.stringify({nombre, apellido, direccion, telefono})){
        return res.status(400).json({msg:'Lo sentimos, la información es la misma'})
    }
    // Actividad 3 (Base de Datos)
    await administrador.findOneAndUpdate({id}, req.body, {new:true})
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Perfil actualizado'})
}


const actualizarPassword = async (req,res)=>{
    // Actividad 1 (Request)
    const {email, password, newpassword, confirmpassword} = req.body
    // Actividad 2 (Validaciones)
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos pero faltan datos'})
    }
    //? Validar si el email existe
    const adminBDD = await administrador.findOne({email})
    if (!adminBDD){
        return res.status(404).json({msg:'Lo sentimos, el email no existe'})
    }
    //? Validar si la contraseña es la misma
    const validarPassword = await adminBDD.matchPassword(password)
    if (!validarPassword){
        return res.status(403).json({msg:'Lo sentimos, la contraseña es incorrecta'})
    }
    //? Validar si la contraseña es la misma
    if (password === newpassword){
        return res.status(400).json({msg:'Lo sentimos, la contraseña es la misma'})
    }
    //? Validar si las contraseñas coinciden
    if (newpassword !== confirmpassword){
        return res.status(400).json({msg:'Lo sentimos, las contraseñas no coinciden'})
    }
    // Actividad 3 (Base de Datos)
    adminBDD.password = await adminBDD.encrypPassword(newpassword)
    await adminBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Contraseña actualizada'})
}

const actualizarEmail = async (req, res) => {
    try {
        // Actividad 1 (Request)
        const { email, newEmail } = req.body;

        // Actividad 2 (Validaciones)
        //? Validar si los campos están vacíos
        if (!email || !newEmail) {
            return res.status(400).json({ msg: 'Lo sentimos pero faltan datos' });
        }

        //? Validar si el nuevo email ya existe
        const emailExistente = await administrador.findOne({ email: newEmail });
        if (emailExistente) {
            return res.status(409).json({ msg: 'Lo sentimos, el email ya se encuentra registrado' });
        }

        //? Validar si el email actual es correcto
        const adminBDD = await administrador.findOne({ email });
        if (!adminBDD) {
            return res.status(404).json({ msg: 'Lo sentimos, el email actual no existe' });
        }

        //? Validar si el email es el mismo
        if (email === newEmail) {
            return res.status(400).json({ msg: 'Lo sentimos, el email es el mismo' });
        }
        
        // Actividad 3 (Base de Datos)
        const newadminBDD = await administrador.findOne(req.adminBDD._id)
        newadminBDD.email = newEmail
        
        await adminBDD.save();

        // Actividad 4 (Respuesta)
        return res.status(200).json({ msg: 'Email actualizado' });
    } catch (msg) {
        // Manejo de msges
        return res.status(500).json({ msg: 'msg al actualizar el email', msg: msg.message });
    }
};


const recuperarPassword = async (req,res)=>{
    // Actividad 1 (Request)
    const {email} = req.body
    // Actividad 2 (Validaciones)
    
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos pero faltan datos'})
    }

    //? Validar si el email existe
    const adminBDD = await administrador.findOne({email})
    if (!adminBDD){
        return res.status(404).json({msg:'Lo sentimos, el email no existe'})
    }
    // Actividad 3 (Base de Datos)
    const token = adminBDD.crearToken()
    adminBDD.token = token
    await sendMailToRecoveryPassword(email,token)
    await adminBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Correo enviado, verifica tu email'})
}
// Obtener una institución por ID
const getInstitucionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar si el id es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'ID no válido' });
        }

        const institucion = await institucion1.findById(id);

        if (!institucion) {
            return res.status(404).json({ msg: 'Institución no encontrada' });
        }

        res.json(institucion);
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
};

const comprobarTokenPasword = async (req,res)=>{
    // Actividad 1 (Request)
    const {token} = req.params
    // Actividad 2 (Validaciones)
    //? Validar si el token existe
    if (!token){
        return res.status(400).json({msg:'Lo sentimos, no se puede validar el token'})
    }
    //? Validar si el token es correcto
    const adminBDD = await administrador.findOne({token})
    if (!adminBDD){
        return res.status(404).json({msg:'Lo sentimos, el token no existe'})
    }
    // Actividad 3 (Base de Datos)
    await adminBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Token confirmado, puedes cambiar tu password'})
}
const nuevoPassword = async (req,res)=>{
    // Actividad 1 (Request)
    const {password, confirmpassword} = req.body
    // Actividad 2 (Validaciones)
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({msg:'Lo sentimos pero faltan datos'})
    }
    //? Validar si las contraseñas coinciden
    if (password !== confirmpassword){
        return res.status(400).json({msg:'Lo sentimos, las contraseñas no coinciden'})
    }
    //? Validar si la contraseña es la misma
    const adminBDD = await administrador.findOne({token:req.params.token})
    if (!adminBDD){
        return res.status(404).json({msg:'Lo sentimos, el token no existe'})
    }
    // Actividad 3 (Base de Datos)
    adminBDD.token = null
    adminBDD.password = await adminBDD.encrypPassword(password)
    await adminBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Contraseña actualizada, ya puedes iniciar sesión'})
}

// Obtener todas las instituciones
const getInstituciones = async (req, res) => {
    try {
        const instituciones = await institucion1.find();
        res.json(instituciones);
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
};

// Crear una nueva institución
const createInstitucion = async (req, res) => {
    const {nombre,direccion,telefono,email,categoria,descripcion,Nestudiantes,Infraestructura,socieconomico } = req.body;
    const newInstitucion = new institucion1({ nombre, direccion, email,telefono,categoria,descripcion,Nestudiantes,Infraestructura,socieconomico });
    try {
        const savedInstitucion = await newInstitucion.save()
        res.status(201).json({msg:'Insitucion registrada con exito para el respectivo analísis'})
    } catch (msg) {
        res.status(400).json({ message: msg.message });
    }
};

// Actualizar una institución
const updateInstitucion = async (req, res) => {
    try {
        const updatedInstitucion = await institucion1.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedInstitucion);
    } catch (msg) {
        res.status(400).json({ message: msg.message });
    }
};

// Eliminar una institución
const deleteInstitucion = async (req, res) => {
    try {
        await institucion1.findByIdAndDelete(req.params.id);
        res.json({ message: 'Institución eliminada' });
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
};

// Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().populate('institucion');
        res.json(estudiantes);
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
};
const crearAyuda = async (req, res) => {
    const { institucion, descripcion, monto } = req.body;

    if (!mongoose.Types.ObjectId.isValid(institucion)) {
        return res.status(400).json({ mensaje: 'ID de institución no válido' });
    }

    try {
        const newAyuda = new Ayuda({
            institucion,
            descripcion,
            monto,
        });
        const savedAyuda = await newAyuda.save();

        res.status(201).json({ msg: 'Ayuda creada exitosamente', ayuda: savedAyuda });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la ayuda', error: error.message });
    }
};


// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
    const { nombre, apellido, institucion, historialSocioeconomico } = req.body;
    const newEstudiante = new Estudiante({ nombre, apellido, institucion, historialSocioeconomico });

    try {
        const savedEstudiante = await newEstudiante.save();
        res.status(201).json(savedEstudiante);
    } catch (msg) {
        res.status(400).json({ message: msg.message });
    }
};

// Actualizar un estudiante
const updateEstudiante = async (req, res) => {
    try {
        const updatedEstudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEstudiante);
    } catch (msg) {
        res.status(400).json({ message: msg.message });
    }
};

// Eliminar un estudiante
const deleteEstudiante = async (req, res) => {
    try {
        await Estudiante.findByIdAndDelete(req.params.id);
        res.json({ message: 'Estudiante eliminado' });
    } catch (msg) {
        res.status(500).json({ message: msg.message });
    }
};


export {
    login,
    perfil,
    registro,
    confirmEmail,
    listaradministradores,
    detalleadministrador,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    actualizarEmail,
    comprobarTokenPasword,
	nuevoPassword,
    createInstitucion,
    getInstituciones,
    updateInstitucion,
    deleteInstitucion,
    getEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    getInstitucionById,
    crearAyuda
}