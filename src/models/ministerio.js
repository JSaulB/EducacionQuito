import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Esquema para Usuario Ministerio

const ministerioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'ministerio'],
        required: true
    },
    verificado: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Método para cifrar el password del ministerio
ministerioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
ministerioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
ministerioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('ministerio',ministerioSchema)

