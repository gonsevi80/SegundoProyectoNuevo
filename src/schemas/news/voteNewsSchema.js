// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

const voteNewsSchema = joi.object({
  value: joi.string().valid("up", "down").required(),
});


// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
//const voteNewsSchema = joi.object({
//value: joi
//.valid(0, 1)
//.required()
//.messages(joiErrorMessages),
//});

//export default voteNewsSchema;

export default voteNewsSchema;
