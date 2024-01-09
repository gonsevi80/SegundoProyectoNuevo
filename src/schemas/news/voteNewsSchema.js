// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const voteNewsSchema = joi.object({
  value: joi
    .valid("positive", "negative")
    .required()
    .messages(joiErrorMessages),
});

export default voteNewsSchema;