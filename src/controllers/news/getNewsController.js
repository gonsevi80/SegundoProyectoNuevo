// Importamos los modelos.
import selectNewsByIdModel from '../../models/news/selectNewsByIdModel.js';

// Función controladora final que retorna una noticia con un id dado.
const getNewsController = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia.
        const { newsId } = req.params;

        // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
        // habrá momentos en los que no exista "req.user". Con la interrogación indicamos
        // a JavaScript que "user" puede ser undefined.
        const news = await selectNewsByIdModel(newsId, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                news,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getNewsController;