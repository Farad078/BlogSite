import { user } from "../models/user.js";

export default async function add(req, res) {
  const value = await user.find({ email: req.body.email });
  console.log(req.body);
  try {
    if (!req.body.password || !req.body.email) {
      return res.status(400).send({
        message: "send all required fields: email, password",
      });
    } else if (value.length === 0) {
      return res.status(404).send({ message: "Register an account" });
    } else {
      // Data storage structure
      const info = {
        title: req.body.title,
        content: req.body.content,
        publish: true,
        feature: req.body.feature,
        file: req.file.filename,
      };
      await user.updateOne(
        { email: req.body.email },
        { $push: { contents: info } }
      );
      return res.status(201).send({ message: "Success" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
