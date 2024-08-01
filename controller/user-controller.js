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
        id: userData.id,
        name: userData.name,
        age: userData.age,
        contact: userData.contact,
        email: userData.email,
        role: userData.role,
        token,
        success: true,
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
      id: userData._id,
      name: userData.name,
      age: userData.age,
      contact: userData.contact,
      email: userData.email,
      role: userData.role,
      token: token,
      success: true,
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
  const { token, email } = req.body;
  try {
    const user = UserService.checkToken(token);
    // console.log("------------",user);

    if (
      user == "JsonWebTokenError: invalid signature" ||
      user == "JsonWebTokenError: token expired"
    ) {
      return res.send({ status: "error", data: "something wrong with token" });
    }
    const useremail = user.email;
    const userid = user._id;
    const update = await UserService.updateUser(userid, email);

    if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const user = await UserService.checkuser(useremail);

      let userData = {
        _id: user._id,
        name: user.name,
        age: user.age,
        contact: user.contact,
        email: user.email,
        role: user.role,
      };

      res.status(200).json({
        id: userData._id,
        name: userData.name,
        age: userData.age,
        contact: userData.contact,
        email: userData.email,
        role: userData.role,
        token: token,
        success: true,
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

exports.getAllUsers = (req, res, next) => {
  try {
    const users = UserService.getAllUsers();
    if (!users) {
      return res.status(400).json({ message: "Could not get all users" });
    }
    users.then((result) => {
      return res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server has a problem");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Could not get all updatedUser" });
    }
    const { _id: id, name, age, contact, email, role } = updatedUser;

    let token = await UserService.generateToken(updatedUser);

    return res
      .status(200)
      .json({ success: true, id, name, age, contact, email, role, token });
  } catch (error) {
    res.status(500).send("Server error");
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
