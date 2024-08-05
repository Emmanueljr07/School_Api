const router = require("express").Router();
const PaymentController = require("../controller/payment-controller");
const auth = require("../middleware/auth");

// router.post("/create", auth, PaymentController.makePayment);
router.patch("/update", auth, PaymentController.updatePayment);
router.get("/", auth, PaymentController.getAllPayments);
router.delete("/delete/:id", auth, PaymentController.deletePayment);

module.exports = router;
