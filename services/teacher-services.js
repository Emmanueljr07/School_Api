const TeacherModel = require("../model/teacher-model");

class TeacherService {
  static async registerTeacher(
    name,
    tSubject,
    gender,
    age,
    email,
    password,
    contact,
    address,
    role
  ) {
    try {
      const createTeacher = new TeacherModel({
        name: name,
        teacherSubjects: tSubject,
        gender: gender,
        age: age,
        email: email,
        password: password,
        contact: contact,
        address: address,
        role: role,
      });
      return await createTeacher.save();
    } catch (err) {
      throw err;
    }
  }

  static checkTeacher(email) {
    try {
      return TeacherModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async getAllTeachers() {
    try {
      return await TeacherModel.find()
        .populate("teacherSubjects")
        .sort({ _id: -1 })
        .select("-password");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateTeacher(
    id,
    name,
    tSubjects,
    gender,
    age,
    email,
    // password,
    contact,
    address
  ) {
    try {
      const updateTeacher = TeacherModel.updateMany(
        { _id: id },
        {
          $set: {
            name: name,
            teacherSubjects: tSubjects,
            gender: gender,
            age: age,
            email: email,
            // password: password,
            contact: contact,
            address: address,
          },
        }
      );
      return await updateTeacher;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTeacher(id) {
    try {
      return TeacherModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeacherService;
