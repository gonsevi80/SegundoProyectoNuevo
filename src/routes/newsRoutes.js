// Importamos las dependencias.
import express from "express";

// Creamos un router.
const router = express.Router();

// Importamos las funciones controladoras finales.
import {
  deleteNewsController,
  newNewsController,
  listNewsController,
  getNewsController,
  canEditController,
  addNewsPhotoController,
  deleteNewsPhotoController,
  voteNewsController,
} from "../controllers/news/index.js";

import {
  userExistsController,
  authUserController,
  authUserOptionalController,
  newsExistsController,
} from "../middleware/index.js";

// Crear una nueva noticia.
router.post(
  "/news",
  authUserController,
  userExistsController,
  newNewsController
);

// Obtener el listado de noticias.
router.get("/news", authUserOptionalController, listNewsController);

// Obtener info de una noticia concreta.
router.get(
  "/news/:newsId",
  authUserOptionalController,
  newsExistsController,
  getNewsController
);

// Agregar una foto a una noticia
router.post(
  "/news/:newsId/photos",
  authUserController,
  userExistsController,
  newsExistsController,
  canEditController,
  addNewsPhotoController
);

// Eliminar una foto de una noticia.
router.delete(
  "/news/:newsId/photos/:photoId",
  authUserController,
  authUserOptionalController,
  userExistsController,
  newsExistsController,
  canEditController,
  deleteNewsPhotoController
);

// Votar una noticia.
router.post(
  "/news/:newsId/votes",
  authUserController,
  userExistsController,
  newsExistsController,
  voteNewsController
);

// Editar una noticia
router.put(
  "/news/:newsId",
  authUserController,
  authUserOptionalController,
  userExistsController,
  newsExistsController,
  canEditController,
  addNewsPhotoController
);
//Eliminar una noticia
router.delete(
  "/news/:newsId",
  authUserController,
  authUserOptionalController,
  userExistsController,
  newsExistsController,
  canEditController,
  deleteNewsController
);

export default router;
