import jwt from 'jsonwebtoken'
import administrador from '../models/administrador.js'
import {Ciudadania} from '../models/ciudadania.js'

import dotenv from 'dotenv'
dotenv.config()

const verificarAutenticacion = async (req,res,next)=>{

if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proporcionar un token"})    
    const {authorization} = req.headers
    try {
        const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        if (rol==="administrador"){
            req.veterinarioBDD = await administrador.findById(id).lean().select("-password")
            
        
        }else if (rol === "ciudadano") {
            req.ciudadanoBDD = await Ciudadania.findById(id).lean().select("-password");
        }
        next()
    } catch (error) {
        return res.status(404).json({msg:"Formato del token no válido"})
    }
}

export default verificarAutenticacion
/*import jwt from 'jsonwebtoken'
import administrador from '../models/administrador.js'

const verificarAutenticacion = async (req,res,next)=>{

if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})    
    const {authorization} = req.headers
    try {
        const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        if (rol==="administrador"){
            req.veterinarioBDD = await administrador.findById(id).lean().select("-password")
            next()
        }
    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({msg:e.message})
    }
}

export default verificarAutenticacion*/