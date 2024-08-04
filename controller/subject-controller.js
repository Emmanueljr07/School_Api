const ClassService = require("../services/class-services");
const SubjectService = require("../services/subject-services");

exports.create = async (req, res, next) => {
  try {
    const { name, subjectClass } = req.body;
    // console.log(name, subjectClass);
    let oldSubject = await SubjectService.checkSubject(name);

    if (oldSubject) {
      return res.status(400).json({ message: "Subject Already Exist" });
    } else {
      let sClass = await ClassService.checkClass(subjectClass);
      if (!sClass) {
        return res.status(400).json({ message: "Class does not exist" });
      }

      let newSubject = await SubjectService.createSubject(name, sClass);

      res.status(200).json({
        success: true,
        result: {
          id: newSubject.id,
          name: newSubject.name,
          subjectClass: sClass.name,
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

exports.getAllSubjects = async (req, res, next) => {
  try {
    const allSubjects = await SubjectService.getSubjects();

    if (!allSubjects) {
      return res.status(400).json({ message: "Could not get all Subjects" });
    }
    return res.status(200).json({ success: true, result: allSubjects });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const { id, name, subjectClass } = req.body;

    const update = await SubjectService.updateSubject(id, name, subjectClass);
    if (!update) {
      return res.status(400).json({ message: "Could not update Subject" });
    } else if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const updatedSubject = await SubjectService.checkSubjectById(id);

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

exports.deleteSubject = async (req, res, next) => {
  try {
    const deletedSubject = await SubjectService.deleteSubject(req.params.id);
    if (!deletedSubject) {
      return res.status(400).json({ message: "Could not delete Class" });
    }
    return res.status(200).json({ success: true, result: deletedSubject });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
