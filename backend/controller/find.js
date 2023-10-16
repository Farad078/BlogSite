import { user } from "../models/user.js";

export default async function find(req, res) {
  try {
    const title = req.body.title;
    const content = req.body.content;
    let value;

    if (title) {
      value = title;
    } else if (content) {
      value = content;
    }
    const val = await user.find({
      "contents.title": value,
    });
    return res.status(201).json(val);
  } catch (error) {
    console.log(error.message);
  }
}
