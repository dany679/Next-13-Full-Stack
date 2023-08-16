import { Schema, model, models } from "mongoose";

export interface IUser {
  image?: string;
  username: string;
  email: string;
  _id: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  username: {
    type: String,
    unique: [true, "name already exists"],
    match: [
      /^(?=.{4,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 4-40 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
