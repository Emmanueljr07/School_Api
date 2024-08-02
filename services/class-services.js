const ClassModel = require("../model/class-model");

class ClassService {
  static async createClass(name) {
    try {
      const createUser = new ClassModel({
        name,
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static checkClass(name) {
    try {
      return ClassModel.findOne({ name });
    } catch (error) {
      throw error;
    }
  }

  static async getClasses() {
    try {
      return await ClassModel.find().sort({ _id: -1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateClass(id, name) {
    try {
      const updateClass = ClassModel.updateOne(
        { _id: id },
        { $set: { name: name } }
      );
      return await updateClass;
    } catch (error) {
      throw error;
    }
  }

  static async deleteClass(id) {
    try {
      return ClassModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ClassService;
