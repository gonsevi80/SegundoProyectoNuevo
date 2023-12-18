// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../db/getPool.js";

// Importamos los errores.
import { notFoundError } from "../services/errorService.js";

const newsExistsController = async (req, res, next) => {
  try {
    const pool = await getPool();

    // Obtenemos el id de la noticia de los path params.
    const { newsId } = req.params;

    const [news] = await pool.query(`SELECT id FROM news WHERE id = ?`, [
      newsId,
    ]);

    // Lanzamos un error si la noticia no existe.
    if (news.length < 1) {
      notFoundError("noticia");
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export default newsExistsController;
