import express from "express";
import { user } from "../models/user.js";
import upload from "../file.js";
import find from "../controller/find.js";
import all from "../controller/all.js";
import login from "../controller/login.js";
import signup from "../controller/signup.js";
import signout from "../controller/signout.js";
import add from "../controller/add.js";
import details from "../controller/details.js";
import changes from "../controller/changes.js";
import deleteContent from "../controller/deleteContent.js";
import deleteAccount from "../controller/deleteAccount.js";

const router = express.Router();

// Get find route
router.get("/find", find);

// router.get("/account/:email", async (req, res) => {
//   try {
//     const { email } = req.params;
//     if (!email) {
//       return res.send({ message: "email is missing" });
//     }
//     const val = await user.find({
//       email: email,
//     });
//     return res.status(201).json(val);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// Router to get all contents
router.get("/all", all);

// Login post request
router.post("/login", login);

// Signup post request
router.post("/signup", signup);

// Sign-out post request
router.post("/sign-out", signout);

// Router to add contents
router.put("/add", upload.single("file"), add);

// Router to take-in personal details
router.put("/personal", upload.single("file"), details);

// Put change request
router.put("/change", changes);

// Delete content
router.delete("/content/", deleteContent);

// Delete Account
router.delete("/account", deleteAccount);

export default router;
