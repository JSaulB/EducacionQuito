//: IMPORTAR JWT
import jwt from "jsonwebtoken";

//: CREAR EL METODO PARA FIRMAR(ID-ROL-NOMBRE) Y GENERAR EL JWTTOKEN
const generarJWT = (id,rol)=>{
    return jwt.sign({id,rol},process.env.JWT_SECRET,{expiresIn:"1d"})
}
// EXPORTAR LA FUNCIÓN
export default  generarJWT
