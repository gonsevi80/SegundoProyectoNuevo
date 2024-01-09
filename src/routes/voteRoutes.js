// routes.js

import express from "express";
import voteController from "./controllers/voteController.js";

const router = express.Router();

router.post("/vote", voteController.voteArticle);

export default router;