import {Schema, model} from 'mongoose' // Importar Schema y model de mongoose
import bcrypt from "bcryptjs" // Importar bcrypt para cifrar el password

// Crear el Schema de administrador
const adminSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:Number,
        trim:true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

const institucionSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    categoria: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C','D','E'],
        trim: true
    },
    historialSocioeconomico: {
        type: String,
        required: true,
        enum: ['Alto', 'Medio', 'Bajo'],
        trim: true
    }
}, {
    timestamps: true
});

const estudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    institucion: {
        type: String,
        required: true,
        trim: true
    },
    historialSocioeconomico: {
        type: String,
        required: true,
        enum: ['Alto', 'Medio', 'Bajo'],
        trim: true
    }
}, {
    timestamps: true
});



// Método para cifrar el password 
adminSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
adminSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
adminSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}


// Exportar los modelos
export default model('administrador',adminSchema); 
export const institucion1 = model('institucion1', institucionSchema);
export const Estudiante = model('Estudiante', estudianteSchema);