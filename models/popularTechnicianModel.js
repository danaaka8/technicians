const mongoose = require('mongoose');

const popularTechnicianSchema = new mongoose.Schema({
  image:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true,
    unique:true
  },
  description:{
    type:String,
    required:true
  },
  link:{
    type:String,
    default:''
  },
  price:{
    type: String,
    required:true
  },
});

const PopularTechnician = mongoose.model('PopularTechnician', popularTechnicianSchema);

module.exports = PopularTechnician;
