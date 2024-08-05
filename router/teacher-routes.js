const router = require("express").Router();
const TeacherController = require("../controller/teacher-controller");
const auth = require("../middleware/auth");

router.post("/register", auth, TeacherController.register);
router.post("/login", TeacherController.login);
router.patch("/update", auth, TeacherController.updateTeacher);
router.get("/", auth, TeacherController.getAllTeachers);
router.delete("/delete/:id", auth, TeacherController.deleteTeacher);

module.exports = router;
