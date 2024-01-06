//importamos los modelos
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import deleteUserModel from "../../models/users/deleteUserModel.js";
//importamos el error de auth.
import { unauthorizedUserError } from "../../services/errorService.js";

// Función controladora final que elimina una noticia.
const deleteUserController = async (req, res, next) => {
  try {
    // Obtenemos el id de al noticia.
    const { userId } = req.params;

    // Obtenemos los detalles de la noticia y almacenamos en la variable la foto que queremos borrar.
    const user = await selectUserByIdModel(UserId);
    //si la noticia no existe o si no se es el usuario de la propia noticia lanza un error.
    if (!user) {
      notFoundError("noticia");
    }
    if (req.user.id !== news.userId) {
      unauthorizedUserError();

      //aquí gestión de error al no estar autorizado a borrar un usuario que no es el propio usuario.
    }
    // Borramos el usuario de la base de datos.
    await deleteUserModel(userId);

    res.send({
      status: "ok",
      message: "Usuario eliminado",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUserController;
