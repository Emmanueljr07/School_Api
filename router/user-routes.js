const router = require("express").Router();
const UserController = require("../controller/user-controller");
const auth = require("../middleware/auth");

router.post("/register", auth, UserController.register);
router.post("/login", UserController.login);
router.patch("/updateProfile", auth, UserController.updateProfile);
router.get("/", auth, UserController.getAllUsers);

module.exports = router;
