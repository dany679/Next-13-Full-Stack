import { Schema, model, models } from "mongoose";

export interface IPrompt {
  userId: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
  _id: string;
}
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  prompt: {
    type: String,
    required: [true, "prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "tags is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
