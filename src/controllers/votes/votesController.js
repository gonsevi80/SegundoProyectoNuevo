// controllers/voteController.js

import Vote from "../models/Vote.js";

const voteController = {
  voteArticle: async (req, res) => {
    try {
      const { userId, newsId, voteType } = req.body;

      // Verificar si el usuario ya votó
      const existingVote = await Vote.findOne({
        user: userId,
        news: newsId,
      });

      if (existingVote) {
        return res
          .status(400)
          .json({ error: "Ya has votado por este artículo." });
      }

      // Crear un nuevo voto
      const newsVote = new Vote({ user: userId, news: newsId, voteType });

      // Guardar el voto en la base de datos
      await newsVote.save();

      res.status(200).json({ message: "Voto registrado exitosamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al procesar el voto." });
    }
  },
};

export default voteController;
