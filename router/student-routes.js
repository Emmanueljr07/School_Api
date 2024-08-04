const router = require("express").Router();
const StudenttController = require("../controller/student-controller");
const auth = require("../middleware/auth");

router.post("/register", auth, StudenttController.register);
router.patch("/update", auth, StudenttController.updateStudent);
router.get("/", auth, StudenttController.getAllStudents);
router.delete("/delete/:id", auth, StudenttController.deleteStudent);

module.exports = router;
