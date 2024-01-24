// Importamos las dependencias.
import { v4 as uuid } from "uuid";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que elimina el voto anterior del usuario para una noticia.
const deletePreviousVote = async (newsId, userId) => {
  const pool = await getPool();
  await pool.query(`DELETE FROM newsVotes WHERE newsId = ? AND userId = ?`, [
    newsId,
    userId,
  ]);
};

// Función que realiza una consulta a la base de datos para votar una noticia.
const insertVoteModel = async (value, newsId, userId) => {
  const pool = await getPool();

  // Comprobamos si ya existe un voto previo por parte del usuario que está intentando votar.
  const existingVotes = await pool.query(
    `SELECT value FROM newsVotes WHERE newsId = ? AND userId = ?`,
    [newsId, userId]
  );

  // // Si la longitud del array de votos es mayor que cero lanzamos un error indicando
  // // que la noticia ya ha sido votada por este usuario.
  // if (existingVotes.length > 0) {
  //   // voteAlreadyExistsError();
  //   throw new Error("La noticia ya ha sido votada por este usuario.");
  // }

  // Eliminamos el voto anterior del usuario.
  await deletePreviousVote(newsId, userId);

  // Insertamos el voto.
  await pool.query(
    `INSERT INTO newsVotes(id, value, newsId, userId) VALUES(?, ?, ?, ?)`,
    [uuid(), value, newsId, userId]
  );
  // Obtenemos la lista actualizada de votos.
  const [updatedVotes] = await pool.query(
    `SELECT value FROM newsVotes WHERE newsId = ?`,
    [newsId]
  );

  // Contamos los votos positivos y negativos.
  const positivos = updatedVotes.filter((voto) => voto.value === 1).length;
  const negativos = updatedVotes.filter((voto) => voto.value === 0).length;

  // Retornamos la respuesta.
  return {
    positivos,
    negativos,
  };
};

export default insertVoteModel;
