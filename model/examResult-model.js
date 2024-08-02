const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const examResultSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  subjectName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
  marks: {
    type: Number,
    default: 0,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exam",
  },
});

const examResultModel = db.model("result", examResultSchema);

module.exports = examResultModel;
