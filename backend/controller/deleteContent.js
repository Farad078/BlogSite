import { user } from "../models/user.js";

export default async function deleteContent(req, res) {
  try {
    const { email, title, content, feature, file } = req.query;

    const info = {
      title: title,
      content: content,
      // feature: feature,
    };

    console.log(info);

    const result = await user.find({ email: email });
    if (result.length === 0) {
      return res.status(500).send({ message: "Email not found" });
    } else {
      const val = await user.updateOne(
        { email: email },
        { $pull: { contents: info } }
      );
      console.log(val);
      return res.send({ message: "Content successfully deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
