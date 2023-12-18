// Importamos los modelos.
import selectAllNewsModel from '../../models/news/selectAllNewsModel.js';

// Función controladora final que retorna el listado de noticias. Permite filtrar por palabra
// clave.
const listNewsController = async (req, res, next) => {
    try {
        // Obtenemos el query param.
        const { keyword } = req.query;

        // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
        // habrá momentos en los que no exista "req.user". Con la interrogación indicamos
        // a JavaScript que "user" puede ser undefined.
        const news = await selectAllNewsModel(keyword, req.user?.id);

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

export default listNewsController;