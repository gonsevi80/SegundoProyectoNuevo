// Importamos las dependencias.
import { v4 as uuid } from "uuid";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los errores.
import { voteAlreadyExistsError } from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para votar una noticia.
const insertVoteModel = async (value, newsId, userId) => {
  const pool = await getPool();

  // Comprobamos si ya existe un voto previo por parte del usuario que está intentando
  // votar.
  const [votes] = await pool.query(
    `SELECT id FROM newsVotes WHERE userId = ? AND newsId = ?`,
    [userId, newsId]
  );

  // Si la longitud del array de votos es mayor que cero lanzamos un error indicando
  // que la noticia ya ha sido votada por este usuario.
  if (votes.length > 0) {
    voteAlreadyExistsError();
  }

  // Insertamos el voto.
  await pool.query(
    `INSERT INTO newsVotes(id, value, newsId, userId) VALUES(?, ?, ?, ?)`,
    [uuid(), value, newsId, userId]
  );

  // Obtenemos la media de votos.
  const [votesAvg] = await pool.query(
    `SELECT AVG(value) AS avg FROM newsVotes WHERE newsId = ?`,
    [newsId]
  );

  // Retornamos la media de votos.
  return Number(votesAvg[0].avg);
};

export default insertVoteModel;
