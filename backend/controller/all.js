import { user } from "../models/user.js";

export default async function (req, res) {
  try {
    const val = await user.find();
    console.log(val);
    return res.status(201).send(val);
  } catch (error) {
    console.log(error.message);
  }
}
