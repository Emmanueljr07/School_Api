const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const classModel = db.model("class", classSchema);

module.exports = classModel;
