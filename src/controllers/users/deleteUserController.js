//importamos los modelos
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import deleteUserModel from "../../models/users/deleteUserModel.js";

//importamos el error de auth.
import { unauthorizedUserError } from "../../services/errorService.js";

//importamos el error de fallo al encontrar al usuario.
import { notFoundError } from "../../services/errorService.js";

// Función controladora final que elimina un usuario.
const deleteUserController = async (req, res, next) => {
  try {
    // Obtenemos el id del usuario.
    const { userId } = req.params;
    console.log(userId);
    // Obtenemos los detalles del usuario y almacenamos en la variable el usuario que queremos borrar.
    const user = await selectUserByIdModel(userId);
    //si el usuario no existe o si no es el propio usuario lanza un error.
    if (!user) {
      notFoundError("usuario");
    }
    if (req.user.id !== user.userId) {
      unauthorizedUserError();

      //aquí gestión del error al no estar autorizado a borrar un usuario que no es el propio usuario.
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
