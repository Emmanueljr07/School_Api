const UserModel = require("../model/user_model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "bjskjgnsrkgskgslgnklhslg93";

class UserService {
  static async registerUser(name, age, contact, email, password, role) {
    try {
      const createUser = new UserModel({
        name,
        age,
        contact,
        email,
        password,
        role,
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static checkuser(email) {
    try {
      return UserModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static getAllUsers() {
    try {
      return UserModel.find();
      // UserModel.find().then((result) => {
      //     res.status(200).send(result);
      // }).catch((err) => {
      //     console.log(err)
      //     return res.status(500).send("Not Authorized");
      // });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateUser(id, email) {
    try {
      const updateUser = UserModel.updateOne(
        { _id: id },
        { $set: { email: email } }
      );
      return await updateUser;
    } catch (error) {
      throw error;
    }
  }

  static generateToken(tokenData) {
    return jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1d" });
    // {expiresIn:jwt_expire}
  }

  static checkToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
