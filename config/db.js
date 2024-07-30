const mongoose = require("mongoose");

const uri =
  "mongodb+srv://testUser:test123@cluster0.tcxk8bf.mongodb.net/SchoolDb?retryWrites=true&w=majority&appName=Cluster0";

const connection = mongoose.createConnection(uri).on("error", (error) => {
  console.log("MongoDb Connection Error: ", error);
});

module.exports = connection;
