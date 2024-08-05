const PaymentService = require("../services/payment-services");

exports.makePayment = async (student, amount, status) => {
  try {
    if (amount < 0 || typeof amount != "number") {
      return res.status(400).json({ message: "Enter a valid amount" });
    } else {
      return await PaymentService.createPayment(student, amount, status);
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const allPayments = await PaymentService.getPayments();

    if (!allPayments) {
      return res.status(400).json({ message: "Could not get all Payments" });
    }
    return res.status(200).json({ success: true, result: allPayments });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const { id, amount, status } = req.body;
    if (amount <= 0 || typeof amount != "number") {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    const update = await PaymentService.updatePayment(id, amount, status);
    if (!update) {
      return res.status(400).json({ message: "Could not update Payment" });
    } else if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const updatedPayment = await PaymentService.checkExamById(id);

      res.status(200).json({
        success: true,
        result: updatedPayment,
      });
    } else if (update.modifiedCount == 0 && update.matchedCount == 1) {
      return res.status(201).json({ message: "Nothing was updated" });
    } else {
      return res
        .status(404)
        .send({ message: "Something Occured, Try again Later!!" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, Try again Later!!" });
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const deletedPayment = await PaymentService.deletePayment(req.params.id);
    if (!deletedPayment) {
      return res.status(400).json({ message: "Could not delete Payment" });
    }
    return res.status(200).json({ success: true, result: deletedPayment });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
