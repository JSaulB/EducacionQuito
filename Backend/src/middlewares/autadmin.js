import jwt from 'jsonwebtoken'
import administrador from '../models/administrador.js'
import ministerio from '../models/ministerio.js'

const verificarAutenticacion = async (req,res,next)=>{

if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})    
    const {authorization} = req.headers
    try {
        const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        if (rol==="Administrador"){
            req.veterinarioBDD = await administrador.findById(id).lean().select("-password")
            next()
        }else{
            // Obtener el usuario
            req.ministerioBDD = await ministerio.findById(id).lean().select("-password")
            req.pacienteBDD.rol = "Ministerio"
            // Continue el proceso
            console.log(req.ministerioBDD);
            next()
        }
    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({msg:e.message})
    }
}

export default verificarAutenticacion