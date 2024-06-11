const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail  } = require('validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "Album"
  }],
  favoritePhotos: [{
    type: Schema.Types.ObjectId,
    ref: "Photo"
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
});

//* Mongoose Middleware
// Set virtual confirmPassword field to value in req body
UserSchema.virtual('confirmPassword')
  .set(function (confPass) {
    this._confirmPassword = confPass;
  })
  .get(function () {
    return this._confirmPassword;
  });

  // Validate that passwords match
  UserSchema.pre('validate', function (next) {
    if (this.password !== this._confirmPassword) {
      this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
  });

  // Hash and salt password prior to saving new User in DB
  UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 16);
    }
    next();
  });

  module.exports = mongoose.model('User', UserSchema);