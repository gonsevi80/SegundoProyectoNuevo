// Importamos los modelos.
import insertPhotoModel from "../../models/news/insertPhotoModel.js";
import selectNewsByIdModel from "../../models/news/selectNewsByIdModel.js";

// Importamos los servicios.
import { savePhotoService } from "../../services/photoService.js";

// Importamos desde útiles.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import addNewsPhotoSchema from "../../schemas/news/addNewsPhotoSchema.js";
import imgSchema from "../../schemas/imgSchema.js";

// Importamos los errores.
import { photoLimitReachedError } from "../../services/errorService.js";

// Función controladora final que agrega una o varias fotos (máximo tres)a una noticia.
const addNewsPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id de la noticia de los path params.
    const { newsId } = req.params;

    // Validamos el body con Joi.
    await validateSchemaUtil(addNewsPhotoSchema, req.files || {});

    // Obtenemos la información de la noticia para comprobar si somos los propietarios.
    const news = await selectNewsByIdModel(newsId);

    // Inicializamos o recuperamos la cantidad total de fotos acumuladas hasta el momento.
    let totalPhotos = news.photos.length;

    // Si la noticia tiene más de tres fotos, lanzamos un error.
    if (totalPhotos > 2) {
      photoLimitReachedError();
    }

    // Declarar el array para almacenar información sobre todas las fotos.
    let photosData = [];

    if (req.files?.photo?.name) {
      req.files.photo = [req.files.photo];
    }
    console.log("files:", req.files.photo);
    if (req.files?.photo && req.files.photo.length) {
      // Verificar que no se exceda el límite total de fotos acumuladas.

      if (totalPhotos + req.files.photo.length > 3) {
        // Si se excede el límite total, lanzamos un error o manejamos la situación según tus necesidades.
        // En este ejemplo, lanzamos un error indicando que se excedió el límite.

        throw new Error("Se ha excedido el límite total de fotos permitidas.");
      }
      // Iterar sobre todas las fotos.
      for (const file of req.files.photo) {
        // Validamos el body con Joi.
        await validateSchemaUtil(imgSchema, file || {});

        // Guardamos la foto en la carpeta de subida de archivos, redimensionamos a un ancho de 500px y obtenemos su nombre.
        const photoName = await savePhotoService(file, 500);

        console.log(totalPhotos);
        // Guardamos la foto en la base de datos y obtenemos el id de la misma.
        const photoId = await insertPhotoModel(photoName, newsId);

        // Incrementamos la cantidad total de fotos acumuladas.
        totalPhotos++;

        // Agregamos información de la foto al array.
        photosData.push({
          id: photoId,
          name: photoName,
        });
      }
    }

    // Enviamos la respuesta al cliente con información sobre todas las fotos procesadas.
    res.send({
      status: "ok",
      data: {
        photos: photosData,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addNewsPhotoController;
