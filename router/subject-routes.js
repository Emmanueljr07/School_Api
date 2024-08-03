const router = require("express").Router();
const SubjectController = require("../controller/subject-controller");
const auth = require("../middleware/auth");

router.post("/create", auth, SubjectController.create);
router.patch("/update", auth, SubjectController.updateSubject);
router.get("/", auth, SubjectController.getAllSubjects);
router.delete("/delete/:id", auth, SubjectController.deleteSubject);

module.exports = router;
