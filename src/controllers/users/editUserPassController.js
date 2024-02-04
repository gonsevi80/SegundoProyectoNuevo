// Importamos los modelos.
import updateUserPassModel from "../../models/users/updateUserPassModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import editUserPassSchema from "../../schemas/users/editUserPassSchema.js";

const editUserPassController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPass, newPassRepeat } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(editUserPassSchema, {
      email,
      recoverPassCode,
      newPass,
      newPassRepeat,
    });

    // Verificar que newPass coincida con newPassRepeat
    if (newPass !== newPassRepeat) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    // Llamamos al modelo para actualizar la contraseña.
    await updateUserPassModel(email, recoverPassCode, newPass);

    res.json({
      status: "ok",
      message: "Contraseña actualizada exitosamente",
    });
  } catch (err) {
    next(err);
  }
};

export default editUserPassController;
