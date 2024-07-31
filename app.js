const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./router/user-routes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const options = {
  origin: process.env.FRONT_END_URL,
};

const app = express();
app.use(cors(options));

app.use(body_parser.json());

app.use("/user", userRouter);

module.exports = app;
