import {Router} from 'express'
import {
    actualizarPaciente,
    detallePaciente,
    eliminarPaciente,
    listarPacientes,
    registrarPaciente,
    loginPaciente,
    perfilPaciente
     
} from "../controllers/ministerio_controller.js";

const router= Router();

router.post('/paciente/login',loginPaciente)
router.get('/paciente/perfil',perfilPaciente)
router.get('/pacientes',listarPacientes)
router.get('/paciente/:id',detallePaciente)
router.post('/paciente/registro',registrarPaciente)
router.put('/paciente/actualizar/:id',actualizarPaciente)
router.delete('/paciente/eliminar/:id',eliminarPaciente)


export default router
