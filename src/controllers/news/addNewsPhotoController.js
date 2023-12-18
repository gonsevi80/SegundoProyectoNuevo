// Importamos los modelos.
import insertPhotoModel from "../../models/news/insertPhotoModel.js";
import selectNewsByIdModel from "../../models/news/selectNewsByIdModel.js";

// Importamos los servicios.
import { savePhotoService } from "../../services/photoService.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import addNewsPhotoSchema from "../../schemas/news/addNewsPhotoSchema.js";

// Importamos los errores.
import { photoLimitReachedError } from "../../services/errorService.js";

// Función controladora final que agrega una foto a una entrada.
const addNewsPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id de al entrada de los path params.
    const { newsId } = req.params;

    // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
    // si se da el caso.
    await validateSchemaUtil(addNewsPhotoSchema, req.files || {});

    // Obtenemos la información de la entrada para comprobar si somos los propietarios.
    const news = await selectNewsByIdModel(newsId);

    // Si la entrada tiene más de tres fotos lanzamos un error.
    if (news.photos.length > 2) {
      photoLimitReachedError();
    }

    // Guardamos la foto en la carpeta de subida de archivos, redimensionamos a un ancho de
    // 500px y obtenemos su nombre.
    const photoName = await savePhotoService(req.files.photo, 500);

    // Guardamos la foto en la base de datos y obtenemos el id de la misma.
    const photoId = await insertPhotoModel(photoName, newsId);

    res.send({
      status: "ok",
      data: {
        photo: {
          id: photoId,
          name: photoName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addNewsPhotoController;
