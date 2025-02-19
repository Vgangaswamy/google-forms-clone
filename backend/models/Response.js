import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [{ questionId: String, answer: String }]
});

export default mongoose.model("Response", ResponseSchema);
