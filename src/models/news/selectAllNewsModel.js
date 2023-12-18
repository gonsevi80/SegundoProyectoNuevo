// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener el listado de noticias.
const selectAllNewsModel = async (keyword = "", userId = "") => {
  const pool = await getPool();

  // Obtenemos el listado de noticias.
  const [news] = await pool.query(
    `
                SELECT 
                    E.id,
                    E.headline,
                    E.entrance, 
                    E.userId = ? AS owner,
                    E.createdAt
                FROM news E
            `,
    [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
  );

  // Retornamos las noticias.
  return news;
};

export default selectAllNewsModel;
