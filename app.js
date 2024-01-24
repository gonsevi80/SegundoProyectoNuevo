import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import routes from "./src/routes/index.js";
import {
  errorController,
  notFoundController,
} from "./src/controllers/errors/index.js";

import { PORT, UPLOADS_DIR } from "./env.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.static(UPLOADS_DIR));
app.use(express.json());
app.use(fileUpload());

// Habilita CORS para todas las rutas
app.use(cors());

app.use(routes);
app.use(notFoundController);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;
