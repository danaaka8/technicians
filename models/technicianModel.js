const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  numServicesDone: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  category: { type: String },
});

const Technician = mongoose.model('Technician', technicianSchema);

module.exports = Technician;
