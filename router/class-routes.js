const router = require("express").Router();
const ClassController = require("../controller/class-controller");
const auth = require("../middleware/auth");

router.post("/create", auth, ClassController.create);
router.patch("/update", auth, ClassController.updateClass);
router.get("/", auth, ClassController.getAllClasses);
router.delete("/delete/:id", auth, ClassController.deleteClass);

module.exports = router;
