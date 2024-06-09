const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail  } = require('validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [4, "Username must be at least 4 characters"],
    maxLength: [16, "Username must be between 4 and 16 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [4, "Email must be at least characters"],
    maxLength: [64, "Email must be between 4 and 64 characters"],
    validate: [isEmail, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
    maxLength: [64, "Password must be between 8 and 64 characters"]
  }
})

