// Importamos los modelos.
import selectNewsByIdModel from "../../models/news/selectNewsByIdModel.js";
import insertVoteModel from "../../models/news/insertVoteModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import voteNewsSchema from "../../schemas/news/voteNewsSchema.js";

// Importamos los errores.
import { cannotVoteOwnNewsError } from "../../services/errorService.js";

// Función controladora final que permite votar una noticia.
const voteNewsController = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const { value } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(voteNewsSchema, req.body);

    // Obtenemos los detalles de la noticia.
    const news = await selectNewsByIdModel(newsId);

    // Si somos los dueños de la noticia lanzamos un error.
    if (news.userId === req.user.id) {
      cannotVoteOwnNewsError();
    }

    // Insertamos el voto y obtenemos la nueva media.
    const votesAvg = await insertVoteModel(value, newsId, req.user.id);

    res.send({
      status: "ok",
      data: {
        votesAvg,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default voteNewsController;
