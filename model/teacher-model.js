const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacherSubjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
  ],
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "teacher",
  },
});

teacherSchema.pre("save", async function () {
  try {
    var teacher = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(teacher.password, salt);

    teacher.password = hashpass;
  } catch (error) {
    throw error;
  }
});

teacherSchema.methods.comparePassword = async function (teacherPassword) {
  try {
    const isMatch = await bcrypt.compare(teacherPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const TeacherModel = db.model("teacher", teacherSchema);

module.exports = TeacherModel;
