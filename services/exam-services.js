const ExamModel = require("../model/exam-model");

class ExamService {
  static async createExam(name, date) {
    try {
      const newExam = new ExamModel({
        name,
        date,
      });
      return await newExam.save();
    } catch (err) {
      throw err;
    }
  }

  static checkExam(name) {
    try {
      return ExamModel.findOne({ name });
    } catch (error) {
      throw error;
    }
  }

  static checkExamById(id) {
    try {
      return ExamModel.findById({ id });
    } catch (error) {
      throw error;
    }
  }

  static async getExams() {
    try {
      return await ExamModel.find().sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateExam(id, name, date) {
    try {
      const updateExam = ExamModel.updateMany(
        { _id: id },
        { $set: { name: name, date: date } }
      );
      return await updateExam;
    } catch (error) {
      throw error;
    }
  }

  static async deleteExam(id) {
    try {
      return ExamModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ExamService;
