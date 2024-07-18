import { Router } from 'express';
import {
    registroCiudadania,
    loginCiudadania,
    registrarNuevoAlumno,
    solicitarAyudaYBecas,
    obtenerCategoriaInstitucion,
    confirmarEmail
} from '../controllers/ciudadania_controller.js';

import verificarAutenticacion from '../middlewares/autenticacion.js';

const router = Router();

// Rutas públicas
router.post('/registro', registroCiudadania);
router.post('/login', loginCiudadania);
router.get('/ciudadania/confirmar', confirmarEmail);

// Rutas protegidas

router.post('/alumnos/registrar/:id', registrarNuevoAlumno);
router.post('/ayudas/registrar/:id', solicitarAyudaYBecas);
router.get('/instituciones/:id/categoria', obtenerCategoriaInstitucion);

export default router;
