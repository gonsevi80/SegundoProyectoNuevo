import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";

import routes from "./src/routes/index.js";
import {
  errorController,
  notFoundController,
} from "./src/controllers/errors/index.js";

import { PORT, UPLOADS_DIR } from "./env.js";

const app = express();

// Middleware que muestra por consola información sobre la petición entrante.
app.use(morgan("dev"));

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
console.log("UPLOADS_DIR:", UPLOADS_DIR);
app.use(express.static(UPLOADS_DIR));
app.use(express.json());

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request"
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: UPLOADS_DIR,
  })
);

// Habilita CORS para todas las rutas
app.use(cors());

app.use(routes);
app.use(notFoundController);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Middleware de manejo de errores general
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.httpStatus || 500;
  const response = {
    status: "error",
    message: err.message || "Error interno del servidor",
  };

  res.status(status).json(response);
});
