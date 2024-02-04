// Importamos las dependencias.
import { v4 as uuid } from "uuid";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una nueva noticia.
const insertNewsModel = async (
  category,
  headline,
  entrance,
  paragraphs,
  userId
) => {
  const pool = await getPool();

  // Generamos el id de la noticia.
  const newsId = uuid();

  // Insertamos la noticia.
  await pool.query(
    `INSERT INTO news(id, category, headline, entrance, paragraphs, userId) VALUES(?, ?, ?, ?, ?, ?)`,
    [newsId, category, headline, entrance, paragraphs, userId]
  );

  console.log(newsId);
  // Retornamos el id de la noticia.
  return newsId;
};

export default insertNewsModel;
