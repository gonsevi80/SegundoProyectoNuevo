// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const editUserPassSchema = joi.object({
  email: joi.string().email().required().messages(joiErrorMessages),
  recoverPassCode: joi.string().required().messages(joiErrorMessages),
  newPass: joi
    .string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  newPassRepeat: joi
    .string()
    .valid(joi.ref("newPass")) // Asegura que newPassRepeat coincida con newPass
    .required()
    .messages(joiErrorMessages),
});

export default editUserPassSchema;
