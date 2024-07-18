import { Router } from 'express';
import {
    registroCiudadania,
    loginCiudadania,
    registrarNuevoAlumno,
    solicitarAyudaYBecas,
    obtenerCategoriaInstitucion
} from '../controllers/ciudadania_controller.js';

import verificarAutenticacion from '../middlewares/autenticacion.js';

const router = Router();

// Rutas públicas
router.post('/registro', registroCiudadania);
router.post('/login', loginCiudadania);

// Rutas protegidas

router.post('/alumnos/registrar/:id',verificarAutenticacion, registrarNuevoAlumno);
router.post('/ayudas/registrar/:id',verificarAutenticacion, solicitarAyudaYBecas);
router.get('/instituciones/:id/categoria',verificarAutenticacion, obtenerCategoriaInstitucion);

export default router;
