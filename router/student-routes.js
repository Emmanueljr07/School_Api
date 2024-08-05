const router = require("express").Router();
const StudentController = require("../controller/student-controller");
const auth = require("../middleware/auth");

router.post("/register", auth, StudentController.register);
router.patch("/update", auth, StudentController.updateStudent);
router.get("/", auth, StudentController.getAllStudents);
router.delete("/delete/:id", auth, StudentController.deleteStudent);

module.exports = router;
