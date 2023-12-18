// Importamos los modelos.
import selectUserByIdModel from '../../models/selectUserByIdModel.js';
import updateUserAvatarModel from "../../models/updateUserAvatarModel.js";

// Importamos los servicios.
import { savePhotoService } from "../../services/photoService.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import editUserAvatarSchema from "../../schemas/users/editUserAvatarSchema.js";

const editUserAvatarController = async (req, res, next) => {
  try {
    // Verificar si hay un archivo cargado
    if (!req.files || !req.files.avatar) {
      return res
        .status(400)
        .send({ message: "No se encontró el archivo del avatar." });
    }

    const avatarFile = req.files.avatar;

    // Crear un objeto que coincida con la estructura esperada por el esquema Joi
    const fileDataForValidation = {
      name: avatarFile.name,
      mimetype: avatarFile.mimetype,
      size: avatarFile.size,
    };

    // Validar el archivo con Joi
    await validateSchemaUtil(editUserAvatarSchema, {
      avatar: fileDataForValidation,
    });

    // Procesar y guardar el archivo
    const avatarName = await savePhotoService(avatarFile, 100);

    // Actualizar la información del usuario en la base de datos
    await updateUserAvatarModel(avatarName, req.user.id);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (err) {
    next(err);
  }
};

export default editUserAvatarController;
