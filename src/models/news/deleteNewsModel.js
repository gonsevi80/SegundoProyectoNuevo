// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para eliminar una noticia.
const deleteNewsModel = async (newsId) => {
  const pool = await getPool();

  // Eliminamos la noticia.
  await pool.query(`DELETE FROM news WHERE id = ?`, [newsId]);
};

export default deleteNewsModel;
