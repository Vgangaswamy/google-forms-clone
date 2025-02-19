import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [{ questionText: String, questionType: String, options: [String] }],
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }]
});

export default mongoose.model("Form", FormSchema);
