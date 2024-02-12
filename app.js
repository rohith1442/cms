import express, { json, urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./src/loaders/logger.js";
dotenv.config();

import router from "./src/api/routes/cases.route.js";

const DB_URL = process.env.DB_URL;

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

mongoose
  .set("strictQuery", true)
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to the database!");
  })
  .catch((err) => {
    logger.error("Cannot connect to the database!", err);
    process.exit();
  });

// Health route
app.get("/", (req, res) => {
  res.json({ message: "Health Check:200 | Status:OK" });
});



// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.use(router);
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
});
