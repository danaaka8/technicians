const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  value:{
    type:String,
    required:true
  }
})


const Informations = mongoose.model('information', informationSchema);

module.exports = Informations;
