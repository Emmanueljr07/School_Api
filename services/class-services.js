const ClassModel = require("../model/class-model");

class ClassService {
  static async createClass(name) {
    try {
      const newClass = new ClassModel({
        name,
      });
      return await newClass.save();
    } catch (err) {
      throw err;
    }
  }

  static async checkClass(name) {
    try {
      return await ClassModel.findOne({ name });
    } catch (error) {
      throw error;
    }
  }
  static async checkClassById(_id) {
    try {
      return await ClassModel.findOne({ _id });
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
