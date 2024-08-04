const ClassService = require("../services/class-services");
const StudentService = require("../services/student-services");

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      studentClass,
      gender,
      dateOfBirth,
      contact,
      parentName,
      address,
    } = req.body;
    // console.log(name, studentClass);
    let oldStudent = await StudentService.checkStudent(name);

    if (oldStudent) {
      return res.status(400).json({ message: "Student Already Exist" });
    } else {
      let sClass = await ClassService.checkClass(studentClass);
      if (!sClass) {
        return res.status(400).json({ message: "Class does not exist" });
      }

      let newStudent = await StudentService.registerStudent(
        name,
        sClass,
        gender,
        dateOfBirth,
        contact,
        parentName,
        address
      );

      res.status(200).json({
        success: true,
        result: {
          id: newStudent.id,
          name: newStudent.name,
          studentClass: sClass.name,
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

exports.getAllStudents = async (req, res, next) => {
  try {
    const allStudents = await StudentService.getAllStudents();

    if (!allStudents) {
      return res.status(400).json({ message: "Could not get all Students" });
    }
    return res.status(200).json({ success: true, result: allStudents });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { id, name, studentClass } = req.body;
    let sClass = await ClassService.checkClass(studentClass);
    if (!sClass) {
      return res.status(400).json({ message: "Class does not exist" });
    }

    const update = await StudentService.updateStudent(id, name, sClass);
    if (!update) {
      return res
        .status(400)
        .json({ message: "Could not update Student Record" });
    } else if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const updatedSubject = await StudentService.checkSubjectById(id);

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

exports.deleteStudent = async (req, res, next) => {
  try {
    const deletedStudent = await StudentService.deleteStudent(req.params.id);
    if (!deletedStudent) {
      return res.status(400).json({ message: "Could not delete Student" });
    }
    return res.status(200).json({ success: true, result: deletedStudent });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
