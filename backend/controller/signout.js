import { user } from "../models/user.js";

export default async function signout(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Data storage structure.
    const info = {
      name: name,
      email: email,
      password: password,
      accessStatus: true,
    };

    const value = await user.find({ email: email });
    if (value.length === 0) {
      await user.create(info);
      return res.status(201).send({ message: "You just registered." });
    }
    return res.status(201).send({ message: "Already registered." });
  } catch (err) {
    console.log(err.message);
  }
}
