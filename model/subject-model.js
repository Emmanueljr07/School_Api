const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subjectClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },
});

const subjectModel = db.model("subject", subjectSchema);

module.exports = subjectModel;
