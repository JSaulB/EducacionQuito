import express from 'express';
import {
    login,
    getInstituciones,
    listarEstudiantes,
    registrarAyuda
} from '../controllers/ministerio_controller.js';

const router = express.Router();

router.post('/login', login);
router.get('/instituciones', getInstituciones);
router.get('/estudiantes', listarEstudiantes);
router.post('/ayudas/registrar', registrarAyuda);

export default router;
