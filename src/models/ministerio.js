import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definición del esquema para Institucion
const institucionSchema = new Schema({
    nombre: { 
        type: String, 
        required: true },
        calificacion: { type: Number, required: true },
        categoria: { type: String, required: true }
});

export const Institucion = model('Institucion', institucionSchema);

// Definición del esquema para Alumno
const alumnoSchema = new Schema({
    nombre: { 
        type: String, 
        required: true },
    
    calificacion: { 
            type: Number, 
            required: true },
    becas: [
        {
            monto: { type: Number, required: true }
        }
    ]
});

export const Alumno = model('Alumno', alumnoSchema);

// Definición del esquema para Ayuda
const ayudaSchema = new Schema({
    institucionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institucion', required: true },
    tipoAyuda: { type: String, required: true },
    cantidad: { type: Number, required: true } // Cambiado de String a Number
});


export const Ayuda = model('Ayuda', ayudaSchema);

// Definición del esquema para Usuario
const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmEmail: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Método para cifrar el password del usuario
userSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
};

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password) {
    const response = await bcrypt.compare(password, this.password);
    return response;
};

export const User = model('User', userSchema);
