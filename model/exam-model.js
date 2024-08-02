const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const examSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const examModel = db.model("exam", examSchema);

module.exports = examModel;
