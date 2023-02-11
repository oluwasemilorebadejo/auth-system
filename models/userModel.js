const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

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
    required: [true, "Please enter your password"],
    minlength: [8, "password must be atleast 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: [8, "password must be atleast 8 characters"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords dont  match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;

  next();
});
// /////////////////////////////////////////////////////////////////////////////////////////////
// will implement checking actual password against supplied password for login, resetpassword///
// /////////////////////////////////////////////////////////////////////////////////////////////

const User = mongoose.model("User", userSchema);

module.exports = User;
