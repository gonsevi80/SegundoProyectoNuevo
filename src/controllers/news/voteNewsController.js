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
    console.log("Usuario:", req.user); // Imprime información del usuario.

    const { newsId } = req.params; // Obtiene el ID de la noticia de los parámetros de la solicitud.

    // Validamos el body con Joi.
    await validateSchemaUtil(voteNewsSchema, req.body); // Valida el cuerpo de la solicitud según el esquema de votación.

    console.log("Solicitud de Voto:", req.body); // Agrega esta línea para imprimir la solicitud completa.

    // Agrega este bloque para asignar un valor numérico a voteValue según el valor en el cuerpo de la solicitud.
    const voteValue =
      req.body.value === "up" ? 1 : req.body.value === "down" ? 0 : null;

    // Obtenemos los detalles de la noticia.
    const newsResult = await selectNewsByIdModel(newsId);

    console.log("noticia:", newsResult);

    if (!newsResult) {
      // Manejar el caso en el que no se encuentra la noticia
      console.error("Noticia no encontrada:", newsId);
      return res
        .status(404)
        .json({ status: "error", message: "Noticia no encontrada" });
    }

    const news = newsResult;

    console.log("Noticia:", news); // Imprime información sobre la noticia.

    if (news.userId === req.user.id) {
      // Verifica si el usuario intenta votar su propia noticia.
      console.error("No puedes votar tu propia noticia:", newsId);
      cannotVoteOwnNewsError(); // Lanza un error personalizado si el usuario intenta votar su propia noticia.
    }

    // Si somos los dueños de la noticia lanzamos un error.
    if (news.length === 0) {
      // Verifica si la noticia existe.
      console.error("Noticia no encontrada:", newsId);
      return res
        .status(404)
        .json({ status: "error", message: "Noticia no encontrada" });
    }

    console.log("Noticia:", news); // Imprime información sobre la noticia.

    if (news.userId === req.user.id) {
      // Verifica si el usuario intenta votar su propia noticia.
      console.error("No puedes votar tu propia noticia:", newsId);
      cannotVoteOwnNewsError(); // Lanza un error personalizado si el usuario intenta votar su propia noticia.
    }

    // Insertamos el voto y obtenemos la nueva media.
    const votesAvg = await insertVoteModel(voteValue, newsId, req.user.id); // Inserta el voto en la base de datos.

    console.log("VotesAvg:", votesAvg); // Imprime información sobre la nueva media de votos.

    // if (voteResult && typeof voteResult[Symbol.iterator] === "function") {
    //   const votesAvg = [...voteResult]; // Convertimos a un array para iterar.
    //   console.log("VotesAvg:", votesAvg); // Imprime información sobre la nueva media de votos.
    // } else {
    //   console.error("Error al obtener la nueva media de votos:", voteResult);
    // }

    // Envía una respuesta exitosa al cliente.
    res.send({
      status: "ok",
      data: {
        votesAvg, // Enviamos el resultado directamente.
      },
    });
  } catch (err) {
    console.error("Error en el controlador de votos:", err); // Imprime información de errores.
    res
      .status(500)
      .json({ status: "error", message: "Error al procesar el voto." }); // Envía una respuesta de error al cliente.
  }
};

export default voteNewsController; // Exporta la función controladora para su uso en otras partes de la aplicación.
