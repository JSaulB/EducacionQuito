import mongoose, {Schema,model} from 'mongoose'


const AyudaSchema = new mongoose.Schema({
    institucion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institucion',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Ayuda', AyudaSchema);

