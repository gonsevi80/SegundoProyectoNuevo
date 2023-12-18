// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const loginUserSchema = joi.object({
    password: joi.string().required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

export default loginUserSchema;
