import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { mongoDB, PORT } from "./config.js";
import routes from "./routes/route.js";
import methodOverride from "method-override";

// create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/", routes);

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("app connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
