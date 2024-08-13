import jwt from 'jsonwebtoken'
import administrador from '../models/administrador.js'
import ministerio from '../models/ministerio.js'

const verificarAutenticacion = async (req,res,next)=>{

if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})    
    const {authorization} = req.headers
try {
    const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
    if (rol==="Administrador"){
        req.adminBDD = await administrador.findById(id).lean().select("-password")
        req.adminBDD.rol = "Administrador"

    }else if (rol === "ministerio") {
        req.ministerioBDD = await ministerio.findById(id).lean().select("-password");
        req.ministerioBDD.rol = "ministerio"
    }
    next()
} catch (error) {
    return res.status(404).json({msg:"Formato del token no válido"})
}
}

export default verificarAutenticacion