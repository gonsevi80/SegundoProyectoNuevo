// Importamos las dependencias.
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

// Importamos los errores.
import { saveFileError, deleteFileError } from "./errorService.js";

// Importamos las variables de entorno necesarias.
import { UPLOADS_DIR } from "../../env.js";
import { log } from "console";

export const savePhotoService = async (img, width) => {
  try {
    // console.log("mirando img", img);

    // Ruta absoluta al directorio de subida de archivos.

    const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

    const dotIndex = img.name.lastIndexOf(".");

    const ext = img.name.slice(dotIndex);

    //console.log(ext);

    // Creamos la carpeta uploads si no existe con la ayuda del método "access".

    try {
      await fs.access(uploadsDir);
    } catch {
      // Si el método anterior lanza un error quiere decir que el directorio no existe.
      // En ese caso entraríamos en el catch y lo crearíamos.
      await fs.mkdir(uploadsDir);
    }
    //console.log("echando un vistazo a", img.data);
    // Creamos un objeto de tipo Sharp con la imagen recibida.

    const sharpImg = sharp(img.data);

    //console.log("echando un vistazo a", sharpImg);
    // Redimensionamos la imagen. El parámetro "width" representa un ancho en píxeles.

    await sharpImg.resize(width);

    // Generamos un nombre único para la imagen para evitar que haya dos imágenes con el
    // mismo nombre.
    const imgName = `${uuid()}${ext}`;

    // Ruta absoluta a la imagen.
    const imgPath = path.join(uploadsDir, imgName);

    //console.log(sharpImg);

    // Guardamos la imagen en la carpeta de subida de archivos.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre con el que hemos guardado la imagen.
    return imgName;
  } catch (err) {
    console.error(err);
    saveFileError();
  }
};

export const deletePhotoService = async (imgName) => {
  try {
    // Ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(process.cwd(), UPLOADS_DIR, imgName);
    console.log(imgPath);
    // Comprobamos si la imagen existe con la ayuda del método "access".
    try {
      await fs.access(imgPath);
    } catch {
      // Si el método anterior lanza un error quiere decir que la imagen no existe.
      // En ese caso finalizamos la función.
      return;
    }

    // Eliminamos erl archivo de la carpeta de subida de archivos.
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    deleteFileError();
  }
};
