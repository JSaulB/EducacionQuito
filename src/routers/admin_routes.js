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

import verificarAutenticacion from "../middlewares/autadmin.js";

const router= Router();
router.post("/loginadmin", login);
router.post("/registroadmin", registro);
router.get("/confirmar/:token", confirmEmail);
router.get("/administradores", listaradministradores);
router.get("/recuperar-password", recuperarPassword);
router.get("/recuperar-password/:token", comprobarTokenPasword);
router.post("/nuevo-password/:token", nuevoPassword);

router.get("/perfil", verificarAutenticacion , perfil);
router.put('/administrador/actualizarpassword',verificarAutenticacion,actualizarPassword)
router.get("/administrador/:id",verificarAutenticacion, detalleadministrador);
router.put("/administrador/:id",verificarAutenticacion ,actualizarPerfil);

router.get('/listai',verificarAutenticacion,getInstituciones);
router.post('/creari',verificarAutenticacion,createInstitucion);
router.put('/actualizari/:id',verificarAutenticacion, updateInstitucion);
router.delete('/eliminari/:id',verificarAutenticacion, deleteInstitucion);

router.get('/listare',verificarAutenticacion, getEstudiantes);
router.post('/creare',verificarAutenticacion, createEstudiante);
router.put('/:id', updateEstudiante);
router.delete('/:id', deleteEstudiante);

export default router