// Importamos joi.
import joi from "joi";

// Importamos el esquema que verifica una imagen.
import imgSchema from "../imgSchema.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias y permitimos que pueda ser un array.
const addNewsPhotoSchema = joi.object({
  photo: joi.array().items(imgSchema).single().min(1).max(3).required(),
});

export default addNewsPhotoSchema;
