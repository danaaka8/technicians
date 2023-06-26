const Category = require('../models/categoryModel');
const Technician = require('../models/technicianModel');

exports.getAllPopularTechnicians = async (req, res) => {
  try {
    const popularTechnicians = await Technician.find({ popular: true }).populate('category');
    console.log(popularTechnicians);
    return res.status(200).json(popularTechnicians);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addNewPopularTechnician = async (req, res) => {
  try {
    const { technicianId } = req.body;

    // Check if the technician exists
    const technician = await Technician.findByIdAndUpdate(technicianId,{
        popular:true
    },{new:true});
    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }


    return res.status(201).json(technician);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePopularTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the technician exists
    const technician = await Technician.findById(id);
    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    technician.popular = false;
    const savedTechnician = await technician.save();

    return res.status(200).json(savedTechnician);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
