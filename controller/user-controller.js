const UserModel = require("../model/user_model");
const UserService = require("../services/user-services");

exports.register = async (req, res, next) => {
  try {
    const { name, age, contact, email, password, role } = req.body;

    // Check if user exist
    let oldUser = await UserService.checkuser(email);

    if (oldUser) {
      return res.status(400).json({ message: "User Already Exist" });
    } else {
      // Creating User
      let user = await UserService.registerUser(
        name,
        age,
        contact,
        email,
        password,
        role
      );
      // if(user == 'Incorrect Password') {
      //     return res.status(400).send({message: "Password not matched"});
      // }

      let userData = {
        id: user.id,
        name: user.name,
        age: user.age,
        contact: user.contact,
        email: user.email,
        role: user.role,
      };

      // Generating Token
      let tokenData = { _id: user.id, email: user.email };
      const token = await UserService.generateToken(tokenData);

      res.status(200).json({
        success: true,
        result: {
          id: userData.id,
          name: userData.name,
          age: userData.age,
          contact: userData.contact,
          email: userData.email,
          role: userData.role,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server issue");
    throw error;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.checkuser(email);

    if (!user) {
      return res.status(404).json({ message: "No user found" });
      // throw new Error("User don't exist");
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch === false) {
      return res.status(400).json({ message: "Invalid credentials" });
      // throw new Error("Invalid Password");
    }

    let tokenData = { _id: user._id, email: user.email };

    let userData = {
      _id: user._id,
      name: user.name,
      age: user.age,
      contact: user.contact,
      email: user.email,
      role: user.role,
    };

    let token = await UserService.generateToken(tokenData);

    res.status(200).json({
      success: true,
      result: {
        id: userData._id,
        name: userData.name,
        age: userData.age,
        contact: userData.contact,
        email: userData.email,
        role: userData.role,
        token: token,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error",
    });
    throw error;
  }
};

exports.update = async (req, res, next) => {
  const { name, role } = req.body;
  try {
    const update = await UserService.updateUser(req.params.id, name, role);

    if (update.modifiedCount == 1 && update.matchedCount == 1) {
      let user = await UserModel.findById(req.params.id);

      res.status(200).json({
        success: true,
        result: {
          id: user._id,
          name: user.name,
          age: user.age,
          contact: user.contact,
          email: user.email,
          role: user.role,
        },
      });
    } else if (update.modifiedCount == 0 && update.matchedCount == 1) {
      return res.status(201).json({ message: "Nothing was updated" });
    } else {
      return res.status(401).send("{Not Authorized}");
    }
  } catch (err) {
    throw err;
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    if (!users) {
      return res.status(400).json({ message: "Could not get all users" });
    }
    return res.status(200).json({ success: true, result: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Could not update Profile" });
    }

    let tokenData = { _id: updatedUser._id, email: updatedUser.email };

    let userData = {
      _id: updatedUser._id,
      name: updatedUser.name,
      age: updatedUser.age,
      contact: updatedUser.contact,
      email: updatedUser.email,
      role: updatedUser.role,
    };

    let token = UserService.generateToken(tokenData);

    res.status(200).json({
      success: true,
      result: {
        id: userData._id,
        name: userData.name,
        age: userData.age,
        contact: userData.contact,
        email: userData.email,
        role: userData.role,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(400).json({ message: "Could not delete User" });
    }
    return res.status(200).json({ success: true, result: deletedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.logout = async (req, res, next) => {
  try {
    // const { token } = req.body;
    var token = req.headers["Authorization"];
    // console.log(token);

    const user = UserService.checkToken(token);
    // console.log(user);

    if (user == "TokenExpiredError: jwt expired") {
      return res.status(400).send({ status: "error", data: "token expired" });
    }
    return res
      .status(200)
      .send({ success: true, message: "LogOut Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
    throw error;
  }
};
