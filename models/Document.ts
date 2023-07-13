import { Schema, model } from "mongoose";

const DocumentSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
});

export default model("Document", DocumentSchema);
