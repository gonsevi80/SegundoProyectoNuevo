// Importa la función getPool.
import getPool from "../../db/getPool.js";

// Función para actualizar una noticia en la base de datos.
const updateNewsModel = async (newsId, updatedNews) => {
  try {
    // Obtiene el objeto 'pool'.
    const pool = await getPool();

    // Realiza la consulta de actualización.
    const [result] = await pool.execute(
      "UPDATE news SET headline = ?, entrance = ?, paragraphs = ? WHERE id = ?",
      [
        updatedNews.headline || null,
        updatedNews.entrance || null,
        updatedNews.paragraphs || null,
        newsId,
      ]
    );

    // Devuelve el resultado de la consulta.
    return result;
  } catch (error) {
    throw error;
  }
};

export default updateNewsModel;
