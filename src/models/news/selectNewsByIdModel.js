// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener información de una
// noticia concreta.
const selectNewsByIdModel = async (newsId, userId = "") => {
  const pool = await getPool();

  // Obtenemos la información necesaria de la noticia.
  const [news] = await pool.query(
    `
                SELECT 
                    E.id,
                    E.headline,
                    E.entrance, 
                    E.paragraphs,
                    E.userId,
                    U.username,
                    BIT_OR(V.userId = ?) AS votedByMe, 
                    E.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    E.createdAt
                FROM news E
                LEFT JOIN newsVotes V ON V.newsId = E.id
                INNER JOIN users U ON U.id = E.userId
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
    [userId, userId, newsId]
  );

  // Verifica si hay noticias antes de intentar acceder a la primera posición.
  if (!news || news.length === 0) {
    // Manejo de la situación en la que no se encontraron noticias.
    // Puedes lanzar un error, devolver un valor predeterminado, etc.
    return {
      status: "error",
      message: "Noticia no encontrada",
    };
  }
  // Obtenemos el array de fotos de la noticia.
  const [photos] = await pool.query(
    `SELECT id, name FROM newsPhotos WHERE newsId = ?`,
    [newsId]
  );

  // Agregamos el array de fotos a la noticia
  news[0].photos = photos;

  // Establecemos como valores booleanos "votedByMe" y "owner"
  news[0].votedByMe = Boolean(news[0].votedByMe);
  news[0].owner = Boolean(news[0].owner);

  // La media de votos es un valor de tipo String. Podemos convertirla a Number.
  news[0].votes = Number(news[0].votes);

  return news[0];
};

export default selectNewsByIdModel;
