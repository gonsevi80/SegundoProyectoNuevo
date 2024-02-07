//importamos los modelos
import selectNewsByIdModel from "../../models/news/selectNewsByIdModel.js";
import deleteNewsModel from "../../models/news/deleteNewsModel.js";
//importamos el error de auth.
import { unauthorizedUserError } from "../../services/errorService.js";

// Función controladora final que elimina una noticia.
const deleteNewsController = async (req, res, next) => {
  try {
    // Obtenemos el id de al noticia.
    const { newsId } = req.params;

    // Obtenemos los detalles de la noticia y almacenamos en la variable la foto que queremos borrar.
    const news = await selectNewsByIdModel(newsId);
    //si la noticia no existe o si no se es el usuario de la propia noticia lanza un error.
    if (!news) {
      notFoundError("noticia");
    }
    if (req.user.id !== news.userId) {
      unauthorizedUserError();

      //aquí gestión de error al no estar autorizado a borrar una noticia que no es del propio usuario.
    }
    // Borramos la noticia de la base de datos.
    await deleteNewsModel(newsId);

    res.send({
      status: "ok",
      message: "Noticia eliminada",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteNewsController;
