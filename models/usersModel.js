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
  phone:{
    type:String,
    required:true,
    unique:true
  },
  favorites:{
    type:[String],
    default:[]
  },
  createdAt: {
    type: String,
    default: Date.now().toString()
  },
  notifications:{
    type:mongoose.Schema.Types.Array,
    default:[]

  },
  password: {
    type: String,
    required: true
  },
  deviceToken:{
    type:String,
    default:null
  },
  status: {
    type: String,
    default: 'offline'
  },
  image: {
    type: Buffer,
    default:null
  },
  location: {
    type: String,
    required: true
  }
});

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
