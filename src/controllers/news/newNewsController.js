// Importamos los modelos.
import insertNewsModel from "../../models/news/insertNewsModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import newNewsSchema from "../../schemas/news/newNewsSchema.js";

// Función controladora final que agrega una nueva noticia.
const newNewsController = async (req, res, next) => {
  try {
    const { headline, entrance, paragraphs } = req.body;

    console.log(headline);
    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
    await validateSchemaUtil(newNewsSchema, Object.assign(req.body));

    // Insertamos la noticia y obtenemos el id que se le ha asignado.
    const newsId = await insertNewsModel(
      headline,
      entrance,
      paragraphs,
      req.user.id
    );

    console.log(newsId);

    res.send({
      status: "ok",
      data: {
        news: {
          id: newsId,
          headline,
          entrance,
          paragraphs,
          userId: req.user.id,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default newNewsController;
