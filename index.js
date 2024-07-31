const app = require("./app");
const db = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to my Api!");
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

const startServer = async () => {
  try {
    await db.once("open", () => {
      console.log("Connected to database");
      app.listen(port, () => {
        console.log(`Server listening on Port http://localhost:${port}`);
      });
    });
  } catch (error) {
    console.log("Error starting server: ", error);
  }
};

startServer();
