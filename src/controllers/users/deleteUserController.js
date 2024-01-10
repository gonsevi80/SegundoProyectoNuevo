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
    // Borramos el usuario de la base de datos.
    await deleteUserModel(req.user.id);

    res.status(200).json({
      status: "ok",
      message: "Usuario eliminado",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUserController;
