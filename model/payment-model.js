const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const paymentModel = db.model("fee", PaymentSchema);

module.exports = paymentModel;
