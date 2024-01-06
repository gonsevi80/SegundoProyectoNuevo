// Importamos las depencias.
import randomstring from "randomstring";

// Importamos los modelos.
import insertUserModel from "../../models/users/insertUserModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import newUserSchema from "../../schemas/users/newUserSchema.js";

// Función controladora final que crea un nuevo usuario.
const newUserController = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios del body.
    const { username, email, password } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(newUserSchema, req.body);

    // Creamos el código de registro.
    const registrationCode = randomstring.generate(30);

    // Insertamos el usuario.
    await insertUserModel(username, email, password, registrationCode);

    res.send({
      status: "ok",
      message: "Usuario creado, por favor revisa tu correo electrónico",
    });
  } catch (err) {
    next(err);
  }
};

export default newUserController;
