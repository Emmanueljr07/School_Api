const { default: mongoose } = require("mongoose");
const app = require("./app");
const db = require("./config/db");
// const UserModel = require('./model/user_model');
// const createError = require("http-error");

const port = 3100;

//Connect to MongoDB

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use(async (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
  // next(createError.NotFound);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

db.once("open", () => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server listening on Port http://localhost:${port}`);
  });
});
