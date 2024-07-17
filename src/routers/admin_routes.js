import {Router} from 'express'

import {
    login,
    perfil,
    registro,
    confirmEmail,
    listaradministradores,
    detalleadministrador,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    actualizarEmail,
    comprobarTokenPasword,
	nuevoPassword,
    createInstitucion,
    getInstituciones,
    updateInstitucion,
    deleteInstitucion,
    getEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
}from "../controllers/admin_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";

const router= Router();
router.post("/login", login);
router.post("/registro", registro);
router.get("/confirmar/:token", confirmEmail);
router.get("/administradores", listaradministradores);
router.get("/recuperar-password", recuperarPassword);
router.get("/recuperar-password/:token", comprobarTokenPasword);
router.post("/nuevo-password/:token", nuevoPassword);

router.get("/perfil", verificarAutenticacion , perfil);
router.put('/administrador/actualizarpassword',verificarAutenticacion,actualizarPassword)
router.get("/administrador/:id",verificarAutenticacion, detalleadministrador);
router.put("/administrador/:id",verificarAutenticacion ,actualizarPerfil);

router.get('/', getInstituciones);
router.post('/', createInstitucion);
router.put('/:id', updateInstitucion);
router.delete('/:id', deleteInstitucion);

router.get('/', getEstudiantes);
router.post('/', createEstudiante);
router.put('/:id', updateEstudiante);
router.delete('/:id', deleteEstudiante);

export default router