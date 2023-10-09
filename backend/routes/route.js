import express from "express";
import { user } from "../models/user.js";
import upload from "../file.js";

const router = express.Router();

// Get find route
router.get("/find", async (req, res) => {
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
});

// Get find route
router.get("/account/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.send({ message: "email is missing" });
    }
    const val = await user.find({
      email: email,
    });
    return res.status(201).json(val);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const val = await user.find();
    console.log(val);
    return res.status(201).send(val);
  } catch (error) {
    console.log(error.message);
  }
});

// Post request
router.post("/login", async (req, res) => {
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
});

// Signup post request
router.post("/signup", async (req, res) => {
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
});

// Signup post request
router.post("/sign-out", async (req, res) => {
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
});

router.put("/add", upload.single("file"), async (req, res) => {
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
});

// Router to take-in personal details
router.put("/personal", upload.single("file"), async (req, res) => {
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
});

// Put change request
router.put("/change", async (req, res) => {
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
});

// Delete files from storage
router.delete("/content/", async (req, res) => {
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
});

// Delete files from storage
router.delete("/account", async (req, res) => {
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
});

export default router;
