const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = mongoose
  .createConnection(process.env.DATABASE_URI)
  .on("error", (error) => {
    console.log("MongoDb Connection Error: ", error);
  });

module.exports = connection;
