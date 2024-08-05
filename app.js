const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./router/user-routes");
const classRouter = require("./router/class-routes");
const subjectRouter = require("./router/subject-routes");
const studentRouter = require("./router/student-routes");
const teacherRouter = require("./router/teacher-routes");
const examRouter = require("./router/exam-routes");
const paymentRouter = require("./router/payment-routes");
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
app.use("/class", classRouter);
app.use("/subject", subjectRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/exam", examRouter);
app.use("/fee", paymentRouter);

module.exports = app;
