const mongoose = require('mongoose');

const popularTechnicianSchema = new mongoose.Schema({
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true
  }
});

const PopularTechnician = mongoose.model('PopularTechnician', popularTechnicianSchema);

module.exports = PopularTechnician;
