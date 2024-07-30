const mongoose = require("mongoose");

const uri =
  "mongodb+srv://testUser:test123@cluster0.tcxk8bf.mongodb.net/SchoolDb?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
  try {
    await mongoose.connect(uri);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.connection.close();
  }
};

module.exports = connect;
