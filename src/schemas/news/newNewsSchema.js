// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newNewsSchema = joi.object({
  headline: joi.string().min(5).max(50).required().messages(joiErrorMessages),
  entrance: joi.string().min(3).max(300).required().messages(joiErrorMessages),
  paragraphs: joi
    .string()
    .min(10)
    .max(2000)
    .required()
    .messages(joiErrorMessages),
});

export default newNewsSchema;
