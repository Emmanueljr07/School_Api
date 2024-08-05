const router = require("express").Router();
const ExamController = require("../controller/exam-controller");
const auth = require("../middleware/auth");

router.post("/create", auth, ExamController.create);
router.patch("/update", auth, ExamController.updateExam);
router.get("/", auth, ExamController.getAllExams);
router.delete("/delete/:id", auth, ExamController.deleteExam);

module.exports = router;
