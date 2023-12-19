// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para eliminar una foto de una noticia.
const deletePhotoModel = async (photoId) => {
  const pool = await getPool();

  // Eliminamos la foto.
  await pool.query(`DELETE FROM newsPhotos WHERE id = ?`, [photoId]);
};

export default deletePhotoModel;
