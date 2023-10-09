import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accessStatus: { type: Boolean, required: true },
  avatar: { type: String },
  bio: { type: String },
  contact: { type: String },
  contents: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      publish: { type: Boolean, required: true },
      feature: { type: String, required: true },
      file: { type: String },
    },
  ],
});

export const user = mongoose.model("user", userSchema);
