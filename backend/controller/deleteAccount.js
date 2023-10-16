import { user } from "../models/user.js";

export default async function deleteAccount(req, res) {
  try {
    const val = req.body.email;
    const result = await user.find({ email: val });
    console.log(val);
    if (result.length === 0) {
      return res.status(500).send({ message: "Email not found" });
    } else {
      await user.deleteMany({ email: val }, { $pull: { email: val } });
      return res.send({ message: "Account successfully deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
