const SubjectService = require("../services/subject-services");
const TeacherService = require("../services/teacher-services");
const UserService = require("../services/user-services");

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      teacherSubjects,
      gender,
      age,
      email,
      password,
      contact,
      address,
    } = req.body;
    // console.log(name, teacherSubjects);
    let oldTeacher = await TeacherService.checkTeacher(email);

    if (oldTeacher) {
      return res.status(400).json({ message: "Teacher Already Exist" });
    } else {
      let tSubjects = [];
      for (let i = 0; i < teacherSubjects.length; i++) {
        let subjects = await SubjectService.checkSubject(teacherSubjects[i]);
        if (!subjects) {
          return res.status(400).json({ message: "Subject does not exist" });
        }
        tSubjects.push(subjects);
      }
      //   let subjects = await SubjectService.checkSubject(teacherSubjects);
      //   if (!subjects) {
      //     return res.status(400).json({ message: "Subject does not exist" });
      //   }

      let newTeacher = await TeacherService.registerTeacher(
        name,
        tSubjects,
        gender,
        age,
        email,
        password,
        contact,
        address,
        "teacher"
      );

      // Generating Token
      let tokenData = { _id: newTeacher.id, email: newTeacher.email };
      const token = await UserService.generateToken(tokenData);

      res.status(200).json({
        success: true,
        result: {
          id: newTeacher.id,
          name: newTeacher.name,
          teacherSubjects: newTeacher.teacherSubjects,
          gender: newTeacher.gender,
          age: newTeacher.age,
          email: newTeacher.email,
          contact: newTeacher.contact,
          address: newTeacher.address,
          role: newTeacher.role,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send({ message: "Something went wrong!! Please try again" });
    throw error;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const teacher = await TeacherService.checkTeacher(email);

    if (!teacher) {
      return res.status(404).json({ message: "No teacher found" });
    }

    const isMatch = await teacher.comparePassword(password);

    if (isMatch === false) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let tokenData = { _id: teacher._id, email: teacher.email };

    let teacherData = {
      _id: teacher._id,
      name: teacher.name,
      teacherSubjects: teacher.teacherSubjects,
      gender: teacher.gender,
      age: teacher.age,
      email: teacher.email,
      contact: teacher.contact,
      address: teacher.address,
      role: teacher.role,
    };

    let token = await UserService.generateToken(tokenData);

    res.status(200).json({
      success: true,
      result: {
        id: teacherData._id,
        name: teacherData.name,
        teacherSubjects: teacherData.teacherSubjects,
        gender: teacherData.gender,
        age: teacherData.age,
        contact: teacherData.contact,
        email: teacherData.email,
        role: teacherData.role,
        token: token,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong. Try again Later!!",
    });
  }
};

exports.getAllTeachers = async (req, res, next) => {
  try {
    const allTeachers = await TeacherService.getAllTeachers();

    if (!allTeachers) {
      return res.status(400).json({ message: "Could not get all Students" });
    }
    return res.status(200).json({ success: true, result: allTeachers });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const { id, name, teacherSubjects } = req.body;
    let tSubject = await SubjectService.checkClass(teacherSubjects);
    if (!tSubject) {
      return res.status(400).json({ message: "Subject does not exist" });
    }

    const update = await TeacherService.updateTeacher(id, name, tSubject);
    if (!update) {
      return res
        .status(400)
        .json({ message: "Could not update Teacher Record" });
    } else if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const updatedSubject = await TeacherService.checkSubjectById(id);

      res.status(200).json({
        success: true,
        result: updatedSubject,
      });
    } else if (update.modifiedCount == 0 && update.matchedCount == 1) {
      return res.status(201).json({ message: "Nothing was updated" });
    } else {
      return res
        .status(404)
        .send({ message: "Something Occured, Try again Later!!" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, Try again Later!!" });
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await TeacherService.deleteTeacher(req.params.id);
    if (!deletedTeacher) {
      return res.status(400).json({ message: "Could not delete Student" });
    }
    return res.status(200).json({ success: true, result: deletedTeacher });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
