// Implementacion de los Endpoints
import mongoose, { Mongoose } from "mongoose";

const InstitucionSchema=new mongoose.Schema({
    nombre:String,
    categoria:String,
    ubicacion:String,

});

const BecaSchema=new mongoose.Schema({
    monto:Number,
    fecha:{type:Date,default:Date.now}
});

const AlumnoSchema=new mongoose.Schema({
    nombre:String,
    calificacion: Number,
    beca:[BecaSchema] 
});

constAyudaSchema=new mongoose.Schema({
    institucionId:mongoose.Schema.Types.ObjectId,
    tipoAyuda:String,
    cantidad:Number,
    fecha:{type:Date,default:Date.now}
});

const Institucion=mongoose.model('Institucion',InstitucionSchema);
const Alumno=mongoose.model('Alumno',AlumnoSchema);
const Ayuda=mongoose.model('Ayuda',AyudaSchema);

export{Institucion,Alumno,Ayuda}