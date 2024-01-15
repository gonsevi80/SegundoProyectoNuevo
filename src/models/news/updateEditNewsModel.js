// Importa el pool de la base de datos.
import pool from "../db/getPool.js";

// Función para actualizar una noticia en la base de datos.
const updateEditNewsModel = async (newsId, updatedNews) => {
  try {
    // Realiza la consulta de actualización.
    const result = await pool.query(
      "UPDATE news SET headline = ?, entrance = ?, paragraph = ? WHERE id = ?",
      [
        updatedNews.headline,
        updatedNews.entrance,
        updatedNews.paragraph,
        newsId,
      ]
    );

    // Devuelve el resultado de la consulta.
    return result;
  } catch (error) {
    throw error;
  }
};

export default updateEditNewsModel;
