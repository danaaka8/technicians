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
  createdAt:{
    type:Date,
    default:new Date()
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordOTP: {
    type: String,
    default: null
  },
  status:{
    type:String,
    enum:['online','offline'],
    default:'offline'
  }
  
});

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
