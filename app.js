const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./router/user-routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(body_parser.json());

app.use("/user", userRouter);

module.exports = app;
