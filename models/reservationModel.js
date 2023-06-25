const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'pending'
  }
  // Add other relevant fields as needed
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation; 