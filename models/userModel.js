const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: [
      true,
      "Username has already been taken. Kindly pick another username.",
    ],
    required: [true, "Kindly enter your username"],
  },
  email: {
    type: String,
    unique: [true, "Email has already been taken. Kindly pick another email."],
    required: [true, "Kindly enter your email"],
    validate: [validator.isEmail, "Kindly provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Kindly enter your password"],
    minlength: [8, "password must be atleast 8 characters"],
    select: false,
  },
  passwordConfirm: {},
});
