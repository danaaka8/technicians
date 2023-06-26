const mongoose = require('mongoose');

const completedReservationSchema = new mongoose.Schema({
  completeTime: {
    type: String,
    required: true,
  },
  user:{
    type:String,
    required:true
  },
  technician:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  // Add other relevant fields as needed
});

const CompletedReservation = mongoose.model('CompletedReservation', completedReservationSchema);

module.exports = CompletedReservation;
