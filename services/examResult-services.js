const ExamResultModel = require("../model/examResult-model");

class ExamResultService {
  static async updateStudentExamResult(student, subjectName, marks, exam) {
    try {
      const newResult = new ExamResultModel({
        student,
        subjectName,
        marks,
        exam,
      });
      return await newResult.save();
    } catch (err) {
      throw err;
    }
  }

  static checkSpecificStudentResult(student, subjectName, exam) {
    try {
      return ExamResultModel.find({
        $or: [
          { student: student },
          { subjectName: subjectName },
          { exam: exam },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  static checkStudentResult(student) {
    try {
      return ExamResultModel.findOne({ student });
    } catch (error) {
      throw error;
    }
  }

  static checkStudentResultById(id) {
    try {
      return ExamResultModel.findById({ id });
    } catch (error) {
      throw error;
    }
  }

  static async getResults() {
    try {
      return await ExamResultModel.find()
        .populate({
          path: "student",
          select: "name",
          populate: { path: "class" },
        })
        .populate("subjectName")
        .populate("exam")
        .sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getResultsByExam(exam) {
    try {
      return await ExamResultModel.find({ exam: exam })
        .populate("student")
        .populate("subjectName")
        .populate("exam")
        .sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // static async updateStudentExamResult(student, subjectName, marks, exam) {
  //   try {
  //     const updateStudentExamResult = ExamResultModel.updateMany(
  //       { student: student },
  //       { $set: { subjectName: subjectName, marks: marks, exam: exam } }
  //     );
  //     return await updateStudentExamResult;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async deleteStudentExamRecord(id) {
    try {
      return ExamResultModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // static async deleteAllExamResultByExam(exam) {
  //   try {
  //     return ExamResultModel.deleteMany({ exam: exam });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = ExamResultService;
