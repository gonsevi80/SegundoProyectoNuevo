// Importamos los modelos.
import selectNewsByIdModel from "../../models/news/selectNewsByIdModel.js";
import deletePhotoModel from '../../models/news/deletePhotoModel.js';

// Importamos los servicios.
import { deletePhotoService } from '../../services/photoService.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorService.js';

// Función controladora final que elimina una foto de una noticia.
const deleteNewsPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id de al noticia y el id de la foto de los path params.
        const { newsId, photoId } = req.params;

        // Obtenemos los detalles de la noticia.
        const news = await selectNewsByIdModel(newsId);

        // Variable que almacenará la foto que queremos eliminar.
        const photo = news.photos.find((photo) => photo.id === photoId);

        // Si la foto no existe en el array de fotos de la noticia lanzamos un error.
        if (!photo) {
            notFoundError('foto');
        }

        // Borramos la foto de la carpeta de subida de archivos.
        await deletePhotoService(photo.name);

        // Borramos la foto de la base de datos.
        await deletePhotoModel(photoId);

        res.send({
            status: 'ok',
            message: 'Foto eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteNewsPhotoController;