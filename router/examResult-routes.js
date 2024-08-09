const router = require("express").Router();
const ExamResultController = require("../controller/examResult-controller");
const auth = require("../middleware/auth");

router.post("/update", auth, ExamResultController.updateStudentExamResult);
router.get("/", auth, ExamResultController.getAllExamResults);
router.get("/:exam", auth, ExamResultController.getAllResultsByExam);
router.get("/student/:id", auth, ExamResultController.myExamResults);
router.delete("/delete/:id", auth, ExamResultController.deleteExamResult);

module.exports = router;
