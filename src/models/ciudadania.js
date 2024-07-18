import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definición del esquema para Ciudadanía
const ciudadaniaSchema = new Schema({
    nombre: { 
        type: String, 
        require: true 
    },
    apellido: { 
        type: String, 
        require: true 
    },
    institucionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Institucion'
    },
    email: { 
        type: String, 
        require: true, 
        unique: true 
    },
    password: { 
        type: String, 
        require: true 
    },
    confirmEmail: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

// Método para cifrar el password del usuario
ciudadaniaSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
};

// Método para verificar si el password ingresado es el mismo de la BDD
ciudadaniaSchema.methods.matchPassword = async function(password) {
    const response = await bcrypt.compare(password, this.password);
    return response;
};

// Exportar el modelo Ciudadanía
export const Ciudadania = model('Ciudadania', ciudadaniaSchema);

