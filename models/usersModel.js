const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordOTP: {
    type: String,
    default: null
  }
});

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
