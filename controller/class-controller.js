const ClassService = require("../services/class-services");

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;

    let oldClass = await ClassService.checkClass(name);

    if (oldClass) {
      return res.status(400).json({ message: "Class Already Exist" });
    } else {
      let newClass = await ClassService.createClass(name);

      res.status(200).json({
        success: true,
        result: {
          id: newClass.id,
          name: newClass.name,
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

exports.getAllClasses = async (req, res, next) => {
  try {
    const allClasses = await ClassService.getClasses();
    if (!allClasses) {
      return res.status(400).json({ message: "Could not get all Classes" });
    }
    return res.status(200).json({ success: true, result: allClasses });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    const update = await ClassService.updateClass(id, name);
    if (!update) {
      return res.status(400).json({ message: "Could not updated Class" });
    } else if (update.modifiedCount == 1 && update.matchedCount == 1) {
      const updatedClass = await ClassService.checkClass(name);

      res.status(200).json({
        success: true,
        result: updatedClass,
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

exports.deleteClass = async (req, res, next) => {
  try {
    const deletedClass = await ClassService.deleteClass(req.params.id);
    if (!deletedClass) {
      return res.status(400).json({ message: "Could not delete Class" });
    }
    return res.status(200).json({ success: true, result: deletedClass });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!! Please try again");
  }
};
