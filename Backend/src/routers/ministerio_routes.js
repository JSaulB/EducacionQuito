import express from 'express';
import { getInstituciones,getEstudiantes } from '../controllers/admin_controller.js';

import verificarAutenticacion from "../middlewares/autadmin.js";

import {
    login,
    registrarMinisterio,
    registrarAyuda,
    perfil,
    actualizarPerfil

} from '../controllers/ministerio_controller.js';

const router = express.Router();
router.get("/ministerio/perfil", verificarAutenticacion , perfil);
router.post('/ministerio/login', login);
router.get('/listari',verificarAutenticacion,getInstituciones);
router.get('/listares',verificarAutenticacion, getEstudiantes);
router.post('/registrar-ayuda', registrarAyuda);
router.post('/ministerio/register', registrarMinisterio);
router.put("/ministerio/:id",verificarAutenticacion ,actualizarPerfil);

export default router;