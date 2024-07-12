import Institucion from '../models/Institucion.js';
import Alumno from '../models/Alumno.js';
import Ayuda from '../models/Ayuda.js';

//Enpoint para el login
export const login = async (req, res) => {
    const{email, password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:'Usuario no encontrado'});

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:'Contraseña incorrecta'});

        const token=jwt.sign({id:user.id}, 'your_jwt_secret',{expiresIn:3600});
        res.json({token});
        
    }catch{
        res.status(500).send("Error en el servidor");
    }
};

//Enpoint para listar estudiantes y sus calificaciones
export const listarEstudiantes=async(req, res) =>{
    try{
        const estudiantes=await Alumno.find().sort({calificacion: -1});
        res.json(estudiantes);
    }catch(err){
        res.status(500).send('Error del servidor');
    }
};

//Registrar ayuda a la institucion elegida y beca a estudiante
export const registrarAyuda=async (req,res) =>{
    const {institucionId,tipoAyuda,cantidad,alumnoId,montoBeca}=req.body;
    try{
        const nuevaAyuda=new Ayuda({
            institucionId,
            tipoAyuda,
            alumnoId,
            montoBeca,

        });
        await nuevaAyuda.save();

        const alumno = await Alumno.finById(alumnoId);
        if(!alumno) return res.status(400).json({msg: 'Alumno no encontrado'});

        alumno.becas.push({monto: montoBeca});
        await alumno.save();

        res.json({mensaje: 'Ayuda y beca registradas', ayuda: nuevaAyuda, alumno});

    }catch(err){
        res.status(500).send('Error en el servidor');
    }
};

