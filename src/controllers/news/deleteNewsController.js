import selectNewsByIdModel from "../../models/news/selectNewsByIdModel";
import { unauthorizedUserError } from "../../services/errorService";

const deleteNewsController = async (req, res, next) => {
  try {
    const { newsId } = req.params;

    // Obtenemos los detalles de la noticia.
    const news = await selectNewsByIdModel(newsId);

    if (!news) {
      notFoundError("noticia");
    }
    if (req.user.id !== news.userId) {
      unauthorizedUserError();

      //aquí gestión de error al no estar autorizado a borrar una noticia que no es del propio usuario.
    }

    res.send({
      status: "ok",
      message: "Noticia eliminada",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteNewsController;
