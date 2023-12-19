// Importamos las dependencias.
import { v4 as uuid } from "uuid";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una foto a una noticia.
const insertPhotoModel = async (photoName, newsId) => {
  const pool = await getPool();

  // Generamos el id de la foto.
  const photoId = uuid();

  // Insertamos la foto.
  await pool.query(`INSERT INTO newsPhotos(id, name, newsId) VALUES(?, ?, ?)`, [
    photoId,
    photoName,
    newsId,
  ]);

  return photoId;
};

export default insertPhotoModel;
