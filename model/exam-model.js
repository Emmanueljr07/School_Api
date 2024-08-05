const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const examSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const examModel = db.model("exam", examSchema);

module.exports = examModel;
