const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const feeSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  amount: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const feeModel = db.model("fee", feeSchema);

module.exports = feeModel;
