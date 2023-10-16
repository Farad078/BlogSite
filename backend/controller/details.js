import { user } from "../models/user.js";

export default async function details(req, res) {
  const info = {
    name: req.body.name,
    contact: req.body.contact,
    bio: req.body.bio,
    avatar: req.file.filename,
  };
  console.log(info);
  const value = await user.find({ email: req.body.email });
  try {
    if (!req.body.email) {
      return res.status(400).send({
        message: "send all required fields: email, password",
      });
    } else if (value.length === 0) {
      return res.status(404).send({ message: "Register an account" });
    } else {
      // data object
      await user.updateOne({ email: req.body.email }, { $set: info });
      return res.status(201).send({ message: "Success" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
