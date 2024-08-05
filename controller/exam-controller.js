// const ClassService = require("../services/class-services");
const ExamService = require("../services/exam-services");

exports.create = async (req, res, next) => {
  try {
    const { name, date } = req.body;
    // console.log(name, date);
    let oldExam = await ExamService.checkExam(name);

    if (oldExam) {
      return res.status(400).json({ message: "Exam Name Already Exist" });
    } else {
      let newExam = await ExamService.createExam(name, date);

      res.status(200).json({
        success: true,
        result: {
          id: newExam.id,
          name: newExam.name,
          date: newExam.date,
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

exports.getAllExams = async (req, res, next) => {
  try {
    const allExams = await ExamService.getExams();

    if (!allExams) {
      return res.status(400).json({ message: "Could not get all Exams" });
    }
    return res.status(200).json({ success: true, result: allExams });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updateExam = async (req, res, next) => {
  try {
    const { id, name, date } = req.body;

    const update = await ExamService.updateExam(id, name, date);
    if (!update) {
      return res.status(400).json({ message: "Could not update Exam" });
    } else if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const updatedExam = await ExamService.checkExamById(id);

      res.status(200).json({
        success: true,
        result: updatedExam,
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

exports.deleteExam = async (req, res, next) => {
  try {
    const deletedExam = await ExamService.deleteExam(req.params.id);
    if (!deletedExam) {
      return res.status(400).json({ message: "Could not delete Exam" });
    }
    return res.status(200).json({ success: true, result: deletedExam });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
