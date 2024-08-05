const PaymentModel = require("../model/payment-model");

class PaymentService {
  static async createPayment(student, amount, status) {
    try {
      const newPayment = new PaymentModel({
        student,
        amount,
        status,
      });
      return await newPayment.save();
    } catch (err) {
      throw err;
    }
  }

  static checkPayment(student) {
    try {
      return PaymentModel.findOne({ student: student }).populate(
        "student",
        "name"
      );
    } catch (error) {
      throw error;
    }
  }

  static checkPaymentById(id) {
    try {
      return PaymentModel.findById({ id });
    } catch (error) {
      throw error;
    }
  }

  static async getPayments() {
    try {
      return await PaymentModel.find()
        .populate("student", "name")
        .sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updatePayment(id, amount, status) {
    try {
      const updatePayment = PaymentModel.updateMany(
        { _id: id },
        { $set: { amount: amount, status: status } }
      );
      return await updatePayment;
    } catch (error) {
      throw error;
    }
  }

  static async deletePayment(id) {
    try {
      return PaymentModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentService;
