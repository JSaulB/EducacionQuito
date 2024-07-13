// Implementacion de los Endpoints
import mongoose from "mongoose";

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
    altoRendimiento:Boolean,
    beca:[BecaSchema] 

});

const AyudaSchema=new mongoose.Schema({
    institucionId:mongoose.Schema.Types.ObjectId,
    tipoAyuda:String,
    cantidad:Number,
    fecha:{type:Date,default:Date.now}
});

const Institucion = mongoose.model('Institucion',InstitucionSchema);
const Alumno = mongoose.model('Alumno',AlumnoSchema);
const Ayuda = mongoose.model('Ayuda',AyudaSchema);

export{Institucion, Alumno, Ayuda}