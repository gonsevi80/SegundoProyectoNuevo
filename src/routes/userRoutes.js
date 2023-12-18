// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  newUserController,
  loginUserController,
  validateUserController,
  getUserProfileController,
  getOwnUserController,
  sendRecoverPassController,
  editUserPassController,
  editUserAvatarController
} from "../controllers/users/index.js";

import { userExistsController, authUserController } from '../middleware/index.js'

// Crear un usuario pendiente de activar.
router.post("/users/register", newUserController);

// Login de usuario.
router.post("/users/login", loginUserController);

// Validar a un usuario.
router.put("/users/validate/:registrationCode", validateUserController);

// Obtener perfil público de un usuario.
router.get("/users/:userId", userExistsController, getUserProfileController);


// Obtener perfil privado de un usuario (ruta protegida)
router.get(
    '/users',
    authUserController, // lo agregamos cuando queremos hacer una ruta privada o protegida
    userExistsController,
    getOwnUserController
);

// Editar el avatar de un usuario.
router.put(
  '/users/avatar',
  authUserController,
  userExistsController,
  editUserAvatarController
);

// Enviar email de recuperación de contraseña.
router.post('/users/password/recover', sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put('/users/password', editUserPassController);


export default router;
