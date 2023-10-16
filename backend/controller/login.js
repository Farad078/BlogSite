import { user } from "../models/user.js";

export default async function login(req, res) {
  try {
    console.log(req.body);
    if (!req.body.password || !req.body.email) {
      return res.status(400).send({
        mssg: "send all required fields: email, password",
        message: false,
      });
    }

    const pass = req.body.password;
    const value = await user.find({ email: req.body.email });

    if (value.length > 0) {
      console.log(value);
      const authPass = value[0].password;
      if (pass === authPass) {
        return res.status(200).send({ message: true });
      } else {
        return res.status(400).send({ message: false });
      }
    }
    return res.status(401).send({ message: "Please signup" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
