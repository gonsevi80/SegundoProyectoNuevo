import { Schema, model } from "mongoose";

const voteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  new: { type: Schema.Types.ObjectId, ref: "New" },
  value: { type: Number, enum: [0, 1], required: true }, // Cambiado a "value" en lugar de "voteType"
  createdAt: { type: Date, default: Date.now },
});

const Vote = model("Vote", voteSchema);

export default Vote;
