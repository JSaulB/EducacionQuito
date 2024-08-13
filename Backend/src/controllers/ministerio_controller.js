import mongoose from 'mongoose';
import { sendMailToUser, sendMailToRecoveryPassword, sendMailToMinisterio } from "../config/nodemailer.js";
import generarJWT from "../helpers/crearJWT.js";
import Ministerio from '../models/ministerio.js';


//Registrar un nuevo usuario para ministerio

const registro = async (req,res)=>{
    const {nombre,email,password,rol}=req.body
    //Valida si no hay campos vacios
    if (Object.values(req.body).includes("")) return res.status("400").json
    ({msg:"Lo sentimos, debes llenar todos los campos"})
    //Verifica si el email ya esta registrado
    const verificarEmailBDD= await Ministerio.findOne({email})
    if (verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    //Crea un nuevo usuario 
    const nuevoMinisterio= new Ministerio(req.body)
    nuevoMinisterio.password= await nuevoMinisterio.encrypPassword(password)
    const token= nuevoMinisterio.crearToken()
    await sendMailToUser(email,token)
    await nuevoMinisterio.save()
    res.status(200).json({mg:"Revisa tu correo electronico para confirmar tu cuenta"})

}

// Método para registrar un paciente

const registrarMinisterio = async(req,res)=>{

    // desestructurar el email
    const {email} = req.body
    console.log(req.body)

    try{
        //  Validar todos los camposs
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
        
        // Obtener el usuario en base al email
        const verificarEmailBDD = await Ministerio.findOne({email})
    
        // Verificar si el paciente ya se encuentra registrado
        if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    
        // Crear una instancia del Paciente
        const nuevoMinisterio = new Ministerio(req.body)
    
        // Crear un password
        const password = Math.random().toString(36).slice(2)
    
        // Encriptar el password
        nuevoMinisterio.password = await nuevoMinisterio.encrypPassword("Min"+password)
    
        // Enviar el correo electrónico
        await sendMailToMinisterio(email,"Min"+password)
    
       
    
        // Guardar en BDD
        await nuevoMinisterio.save()
    
        // Presentar resultados
        res.status(200).json({msg:"Registro exitoso del Ministerio y correo enviado"})

    }catch (error){
        console.log(error)
        

    }

}

//Login de un usuario para ministerio

const login = async(req,res)=>{
    const {email,password}=req.body

    //Valida que no hayan campos vacios
    if (Object.values(req.body).includes("")) return res.status(404).json
    ({msg:"Lo sentimos, debes llenar todo los campos"})

    //Buscar al usuario
    const ministerioBDD= await Ministerio.findOne({email});
    if(!ministerioBDD){
        return res.status(400).json({msg: "Lo sentimos, el email no existe" });
    }
   

    //Verificar si el email ha sido confirmado
    if(ministerioBDD?.confirmEmail===false)return res.status(403).json
    ({msg:"Lo sentimos, debes verificar tu cuenta"})


    //Validar la contraseña
    const verificartPassword = await ministerioBDD.matchPassword(password);
    if (!verificartPassword)
        return res.status(404).json({msg:"Lo el password no es el correcto"})

    const token = generarJWT(ministerioBDD._id,"ministerio")
    const {nombre,apellido,direccion,telefono,_id}= ministerioBDD

    res.status(200).json({
        token,
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:ministerioBDD.email,
        rol:"ministerio",
    })  
}
//Actualización del Perfil
const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    //Validar ID
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    //Validar Campos Vacíos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    //Buscar al usuario
    const ministerioBDD = await Ministerio.findById(id)
    if(!ministerioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`})
    //Verifica si el email esta siendo cambiado y ya existe
        if (ministerioBDD.email !=  req.body.email)
    {
        const ministerioBDDMail = await Ministerio.findOne({email:req.body.email})
        if (ministerioBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el existe ya se encuentra registrado`})  
        }
    }
    //Actualizar el perfil
    ministerioBDD.nombre = req.body.nombre || ministerioBDD?.nombre
    ministerioBDD.apellido = req.body.apellido  || ministerioBDD?.apellido
    ministerioBDD.direccion = req.body.direccion ||  ministerioBDD?.direccion
    ministerioBDD.telefono = req.body.telefono || ministerioBDD?.telefono
    ministerioBDD.email = req.body.email || ministerioBDD?.email
    await ministerioBDD.save()

    res.status(200).json({msg:"Perfil actualizado correctamente"})
}
//Perfil de usuario
const perfil=(req,res)=>{
    res.status(200).json({res:'perfil de ministerio'})
}
 //Confirmacion de email
const confirmEmail = async (req,res)=>{
    
    if (!(req.params.token))return res.status(400).json
    ({msg:"Lo sentimos, no se puede validar"})

    const ministerioBDD= await Ministerio.findOne({token:req.params.token})
    if (!ministerioBDD?.token) return res.status(400).json({msg:"La cuenta ya ha sido confirmada"})
    
    ministerioBDD.token= null
    ministerioBDD.confirmEmail=true
    await ministerioBDD.save()
    res.status(200).json({msg:'Token confirmado, ya puedes iniciar sesión'})
}

//Listar Instituciones
const listarInstituciones = async (req,res)=>{
    const instituciones = await Ministerio.find();
    res.status(200).json({instituciones});
};

// Detalle de una institución
const detalleInstituciones = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
    }

    const ministerioBDD = await Ministerio.findById(id).select("-password");
    if (!ministerioBDD) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
    }

    res.status(200).json({ ministerioBDD });
};

// Actualizacion de la contraseña
const actualizarPassword = async (req,res)=>{
    const ministerioBDD = await Ministerio.findById(req.ministerioBDD._id)
    if(!ministerioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})

    const verificarPassword = await ministerioBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    ministerioBDD.password = await ministerioBDD.encrypPassword(req.body.passwordnuevo)
    await ministerioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}
//Recuperar Contraseña
const recuperarPassword= async (req,res)=>{
    const {email} = req.body;
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const ministerioBDD = await Ministerio.findOne({email})
    if(!ministerioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = ministerioBDD.crearToken()
    ministerioBDD.token=token
    await sendMailToRecoveryPassword(email,token)
    await ministerioBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}

//Comprobar token para recuperación de contraseña
const comprobarTokenPasword= async (req,res)=>{
    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const ministerioBDD = await Ministerio.findOne({token:req.params.token})
    if(ministerioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await ministerioBDD.save()

    res.status(200).json({res:'verificar token mail'})
}
//Establecer nuevo password
const nuevoPassword= async(req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    //Validar que no haya campos vacios
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const ministerioBDD = await Ministerio.findOne({token:req.params.token})
    
    if(ministerioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    ministerioBDD.token = await null
    ministerioBDD.password = await ministerioBDD.encrypPassword(password)
    await ministerioBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}
//Registrar ayuda a las instituciones

const registrarAyuda = async (req,res) =>{
    const {idInstitucion, ayuda} = req.body;

    //Valida que no haya campos vacíos
    if (!idInstitucion || ayuda){
        return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"});
    }

    //Validar ID de institucion
    if(!mongoose.Types.ObjectId.isValid(idInstitucion)){
        return res.status(400).json({msg: `Lo sentimos, no existe la institucion con ID ${idInstitucion}`});
    }

    //Agregar ayuda a la institución
    institucionBDD.ayuda = institucionBDD.ayuda || [];
    institucionBDD.ayuda.push(ayuda);
    await institucionBDD.save();

    res.status(200).json({msg: "Ayuda registrada correctamente"});

}



export {
    login,
    perfil,
    registro,
    confirmEmail,
    listarInstituciones,
    detalleInstituciones,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword,
    registrarAyuda,
    registrarMinisterio
}