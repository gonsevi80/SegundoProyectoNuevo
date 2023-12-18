// Importamos los modelos.
import updateUserPassModel from "../../models/updateUserPassModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import editUserPassSchema from "../../schemas/users/editUserPassSchema.js";

const editUserPassController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPass } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(editUserPassSchema, req.body);

    await updateUserPassModel(email, recoverPassCode, newPass);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    });
  } catch (err) {
    next(err);
  }
};

export default editUserPassController;
