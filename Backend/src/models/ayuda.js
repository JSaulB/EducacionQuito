import mongoose from 'mongoose';

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

const Ayuda = mongoose.model('Ayuda', AyudaSchema);

export default Ayuda;


