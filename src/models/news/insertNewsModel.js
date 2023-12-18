// Importamos las dependencias.
import { v4 as uuid } from "uuid";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una nueva entrada.
const insertNewsModel = async (headline, entrance, paragraphs, userId) => {
  const pool = await getPool();

  // Generamos el id de la entrada.
  const newsId = uuid();

  // Insertamos la entrada.
  await pool.query(
    `INSERT INTO news(id, headline, entrance, paragraphs, userId) VALUES(?, ?, ?, ?, ?)`,
    [newsId, headline, entrance, paragraphs, userId]
  );

  console.log(newsId);
  // Retornamos el id de la entrada.
  return newsId;
};

export default insertNewsModel;
