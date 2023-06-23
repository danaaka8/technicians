const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  numServicesDone: {
    type: Number,
    default: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  workTime: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  price:{
    type:mongoose.Schema.Types.Number,
    default:0.0
  }
});

const Technician = mongoose.model('Technician', technicianSchema);

module.exports = Technician;