const StudentModel = require("../model/student-model");

class StudentService {
  static async registerStudent(
    name,
    studentClass,
    gender,
    dateOfBirth,
    contact,
    parentName,
    address
  ) {
    try {
      const createStudent = new StudentModel({
        name: name,
        class: studentClass,
        gender: gender,
        dob: dateOfBirth,
        contact: contact,
        parentName: parentName,
        address: address,
      });
      return await createStudent.save();
    } catch (err) {
      throw err;
    }
  }

  static checkStudent(name) {
    try {
      return StudentModel.findOne({ name });
    } catch (error) {
      throw error;
    }
  }

  static async getAllStudents() {
    try {
      return await StudentModel.find().populate("class").sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateStudent(id, name, studentClass) {
    try {
      const updateStudent = StudentModel.updateMany(
        { _id: id },
        { $set: { name: name, class: studentClass } }
      );
      return await updateStudent;
    } catch (error) {
      throw error;
    }
  }

  static async deleteStudent(id) {
    try {
      return StudentModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StudentService;
