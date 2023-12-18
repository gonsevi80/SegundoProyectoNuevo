// Importamos las dependencias.
import express from "express";

// Importamos las rutas de los usuarios y demás rutas
import userRoutes from "./userRoutes.js";
import newsRoutes from "./newsRoutes.js";

// Creamos un router.
const router = express.Router();

// Indicamos a express dónde están las rutas de los usuarios y otras
router.use(userRoutes);
router.use(newsRoutes);

export default router;
