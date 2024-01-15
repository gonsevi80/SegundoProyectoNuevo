// Importa los modelos y servicios necesarios.
import updateNewsModel from "../../models/news/updateNewsModel.js";
import selectNewsByIdModel from "../../models/news/selectNewsByIdModel.js";
import {
  unauthorizedUserError,
  notFoundError,
} from "../../services/errorService.js";

const editNewsController = async (req, res, next) => {
  try {
    // Obtiene el ID de la noticia.
    const { newsId } = req.params;

    // Obtiene los datos actualizados de la noticia del cuerpo de la solicitud.
    const updatedNewsData = req.body;

    // Obtiene la noticia existente.
    const existingNews = await selectNewsByIdModel(newsId);

    // Verifica si la noticia existe.
    if (!existingNews) {
      notFoundError("Noticia no encontrada");
    }

    // Verifica si el usuario tiene permiso para editar la noticia.
    if (existingNews.userId !== req.user.id) {
      unauthorizedUserError();
    }

    // Actualiza la noticia con los datos proporcionados.
    const updatedNews = await updateNewsModel(newsId, updatedNewsData);

    // Envía la noticia actualizada como respuesta.
    res.json(updatedNews);
  } catch (err) {
    next(err);
  }
};

export default editNewsController;
