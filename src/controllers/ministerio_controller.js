
const loginPaciente = (req,res)=>{
    res.send("Login del paciente")
}
const perfilPaciente = (req,res)=>{
    res.send("Perfil del paciente")
}
const listarPacientes = (req,res)=>{
    res.send("Listar pacientes")
}
const detallePaciente = (req,res)=>{
    res.send("Detalle del paciente")
}
const registrarPaciente = (req,res)=>{
    res.send("Registrar paciente")
}
const actualizarPaciente = (req,res)=>{
    res.send("Actualizar paciente")
}
const eliminarPaciente = (req,res)=>{
    res.send("Eliminar paciente")
}

export {
		loginPaciente,
		perfilPaciente,
    listarPacientes,
    detallePaciente,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente
}