import express from 'express';
import { getInstituciones,getEstudiantes } from '../controllers/admin_controller.js';

import verificarAutenticacion from "../middlewares/autadmin.js";

import {
    login,
    registrarAyuda
} from '../controllers/ministerio_controller.js';

const router = express.Router();

router.post('/ministerio/login', login);
router.get('/listari',verificarAutenticacion,getInstituciones);
router.get('/listares',verificarAutenticacion, getEstudiantes);
router.post('/registrar-ayuda', registrarAyuda);


export default router;