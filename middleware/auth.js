const UserService = require("../services/user-services");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = UserService.checkToken(token);
    if (decoded == "TokenExpiredError: jwt expired") {
      return res.status(404).send({ status: "error", data: "token expired" });
    }
    const { _id, email } = decoded;
    req.user = { _id, email };
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server issue");
    throw error;
  }
};

module.exports = auth;
