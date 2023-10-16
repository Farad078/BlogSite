import { user } from "../models/user.js";

export default async function changes(req, res) {
  const value = await user.find({ email: req.body.email });
  try {
    if (!req.body.password || !req.body.email) {
      return res.status(400).send({
        message: "send all required fields: email, password",
      });
    } else if (value.length === 0) {
      return res.status(404).send({ message: "Register an account" });
    }

    // Data storage structure
    const info = {
      title: req.body.title,
      content: req.body.content,
    };

    const val = await user.findOneAndUpdate(
      { email: req.body.email, "contents.title": req.body.title },
      { $set: { "contents.$.content": info.content } }
    );
    return res.status(201).send(val);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
