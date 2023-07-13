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
  price:{
    type: String,
    required:true
  },
});

const PopularTechnician = mongoose.model('PopularTechnician', popularTechnicianSchema);

module.exports = PopularTechnician;
