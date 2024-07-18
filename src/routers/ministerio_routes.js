import express from 'express';
import { getInstituciones } from '../controllers/admin_controller.js';
import verificarAutenticacion from "../middlewares/autadmin.js";

import {
    login,
    listarEstudiantes,
    registrarAyuda
} from '../controllers/ministerio_controller.js';

const router = express.Router();

router.post('/ministerio/login', login);
router.get('/listai',verificarAutenticacion,getInstituciones);
router.get('/estudiantes', listarEstudiantes);
router.post('/ayudas/registrar', registrarAyuda);


export default router;