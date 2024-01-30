// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener el listado de noticias.
const selectAllNewsModel = async (keyword = "", userId = "") => {
  const pool = await getPool();

  // Dejamos keyword para futura implementacion de una busqueda

  let strQuery = `
      SELECT 
      E.id,
      E.headline,
      E.entrance, 
      E.userId,
      U.username AS owner,
      U.avatar,
      E.createdAt
      FROM news E
      LEFT JOIN users U ON E.userId = U.id
      ORDER BY E.createdAt DESC
      `;

  // Si no hay token, solo devolvemos una news (la ultima)
  /*if (!userId === "") {
    strQuery += "LIMIT 1";
  }*/
  console.log(userId);
  const [news] = await pool.query(strQuery, [userId]);

  // Retornamos las noticias.
  return news;
};

export default selectAllNewsModel;
