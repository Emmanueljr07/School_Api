const SubjectModel = require("../model/subject-model");

class SubjectService {
  static async createSubject(name, subjectClass) {
    try {
      const newSubject = new SubjectModel({
        name,
        subjectClass,
      });
      return await newSubject.save();
    } catch (err) {
      throw err;
    }
  }

  static checkSubject(name) {
    try {
      return SubjectModel.findOne({ name });
    } catch (error) {
      throw error;
    }
  }

  static checkSubjectById(id) {
    try {
      return SubjectModel.findById({ id });
    } catch (error) {
      throw error;
    }
  }

  static async getSubjects() {
    try {
      return await SubjectModel.find().sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateSubject(id, name, subjectClass) {
    try {
      const updateSubject = SubjectModel.updateMany(
        { _id: id },
        { $set: { name: name, subjectClass: subjectClass } }
      );
      return await updateSubject;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubject(id) {
    try {
      return SubjectModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SubjectService;
