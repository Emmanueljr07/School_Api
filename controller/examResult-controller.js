const ExamResultService = require("../services/examResult-services");
const StudentService = require("../services/student-services");
const SubjectService = require("../services/subject-services");
const ExamService = require("../services/exam-services");
const StudentModel = require("../model/student-model");

exports.updateStudentExamResult = async (req, res, next) => {
  try {
    const { student, subjectName, marks, exam } = req.body;
    const existingStudent = await StudentService.checkStudent(student);
    const existingSubject = await SubjectService.checkSubject(subjectName);
    const existingExam = await ExamService.checkExam(exam);

    if (!existingStudent || !existingSubject || !existingExam) {
      return res
        .status(400)
        .json({ message: "Could not Update Student Marks" });
    } else if (marks < 0 || marks > 20) {
      return res.status(400).json({ message: "Marks should be between 20" });
    }

    const oldResult = await ExamResultService.checkSpecificStudentResult(
      existingStudent,
      existingSubject,
      existingExam
    );

    if (oldResult.length === 0) {
      let newExamResult = await ExamResultService.updateStudentExamResult(
        existingStudent,
        existingSubject,
        marks,
        existingExam
      );
      if (!newExamResult) {
        return res
          .status(400)
          .json({ message: "Could not update student Exam Results" });
      }
      res.status(200).json({
        success: true,
        result: {
          id: newExamResult.id,
          student: newExamResult.student,
          subjectName: newExamResult.subjectName,
          marks: newExamResult.marks,
          exam: newExamResult.exam,
        },
      });
    } else {
      const updatedResult = await ExamResultService.updateResult(
        existingStudent,
        existingSubject,
        marks,
        existingExam
      );
      if (!updatedResult) {
        return res
          .status(400)
          .json({ message: "Could not update student Exam Results" });
      } else {
        res.status(200).json({
          success: true,
          result: {
            id: updatedResult.id,
            student: updatedResult.student,
            subjectName: updatedResult.subjectName,
            marks: updatedResult.marks,
            exam: updatedResult.exam,
          },
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send({ message: "Something went wrong!! Please try again Later" });
    throw error;
  }
};

exports.getAllExamResults = async (req, res, next) => {
  try {
    const allExamResults = await ExamResultService.getResults();

    if (!allExamResults) {
      return res
        .status(400)
        .json({ message: "Could not get all Exam Results" });
    }
    return res.status(200).json({ success: true, result: allExamResults });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.getAllResultsByExam = async (req, res, next) => {
  try {
    const allResultsByExam = await ExamResultService.getResultsByExam(
      req.params.exam
    );

    if (!allResultsByExam) {
      return res
        .status(400)
        .json({ message: "Could not get all Results of Exam" });
    }
    return res.status(200).json({ success: true, result: allResultsByExam });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.myExamResults = async (req, res, next) => {
  try {
    const student = await StudentModel.findById({ _id: req.params.id });
    const myResults = await ExamResultService.checkStudentResult(student);
    if (!myResults) {
      return res.status(400).json({ message: "Could not get your results" });
    }
    return res.status(200).json({ success: true, result: myResults });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.deleteExamResult = async (req, res, next) => {
  try {
    const deletedStudentResult =
      await ExamResultService.deleteStudentExamRecord(req.params.id);
    if (!deletedStudentResult) {
      return res.status(400).json({ message: "Could not delete Exam" });
    }
    return res
      .status(200)
      .json({ success: true, result: deletedStudentResult });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
