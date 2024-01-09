// models/Vote.js

import { Schema, model } from "mongoose";

const voteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  new: { type: Schema.Types.ObjectId, ref: "New" },
  voteType: { type: String, enum: ["positive", "negative"] },
  createdAt: { type: Date, default: Date.now },
});

const Vote = model("Vote", voteSchema);

export default Vote;
