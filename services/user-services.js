const UserModel = require("../model/user_model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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

  static async getAllUsers() {
    try {
      return await UserModel.find().sort({ _id: -1 });
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
    return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
    // {expiresIn:jwt_expire}
  }

  static checkToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
