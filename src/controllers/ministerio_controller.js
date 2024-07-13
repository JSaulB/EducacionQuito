import {Institucion, Alumno, Ayuda} from '../models/ministerio_models.js';

//Enpoint para el login
export const login = async (req, res) => {
    const{email, password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:'Usuario no encontrado'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:'Contraseña incorrecta'});

        const token=jwt.sign({id:user.id}, 'your_jwt_secret',{expiresIn:3600});
        res.json({token});
        
    }catch (err){
        res.status(500).send("Error en el servidor");
    }
};

//Enpoint para visualizar detalle de la institucion y su categoria
export const getInstituciones = async(req, res) =>{
    try{
        const instituciones = await Institucion.find().sort({calificacion: -1});
        res.json(instituciones);

    }catch(err){
        res.status(500).send('Error en el servidor');
    }
}
//Endpoint para listar estudiantes y sus calificaciones

export const listarEstudiantes= async(req, res)=>{
    try{
        const estudiantes = await Alumno.find().sort({calificacion: -1});
        res.json(estudiantes);
    }catch(err){
        res.status(500).send('Error en el Servidor');
    }

};

//Registrar ayuda a la institucion elegida y al niño con la beca mas alta

export const registrarAyuda=async (req, res)=>{
    const{institucionId, tipoAyuda, cantidad, alumnos} =req.body;
    try{
        const nuevaAyuda=new Ayuda({
            institucionId,
            tipoAyuda,
            cantidad

        });
        await nuevaAyuda.save();

        const promises = alumnos.map(async (alumnoId) => {
            const alumno = await Alumno.findById(alumnoId);
            if (!alumno) return res.status(404).json({ msg: 'Alumno no encontrado' });

            alumno.becas.push({ monto: 1000 }); // Suponiendo un monto fijo para la beca
            await alumno.save();
        });

        await Promise.all(promises);

        res.json({ mensaje: 'Ayuda y becas registradas', ayuda: nuevaAyuda });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};