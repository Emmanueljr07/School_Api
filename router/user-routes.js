const router = require("express").Router();
const UserController = require("../controller/user-controller");
const auth = require("../middleware/auth");

router.post("/register", auth, UserController.register);
router.post("/login", UserController.login);
router.patch("/update/:id", auth, UserController.update);
router.patch("/updateProfile", auth, UserController.updateProfile);
router.delete("/delete/:id", auth, UserController.deleteUser);
router.get("/", auth, UserController.getAllUsers);

module.exports = router;
