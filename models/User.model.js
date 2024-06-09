const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail, isAlphanumeric,  } = require('validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [4, "Username must be at least 4 characters"],
    maxLength: [16, "Username must be between 4 and 16 characters"]
  }
})

