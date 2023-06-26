const { log } = require('console');
const Technician = require('../models/technicianModel');
const fs = require('fs');
const Category = require('../models/categoryModel')


// Create a new technician
const createTechnician = async (req, res) => {
  try {
    const { image, name, email, phone, location, category } = req.body;
  
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  // Read the file as binary data
  const data = fs.readFileSync(file.path);

  // Encode the file data as base64 string
  const base64String = data.toString('base64');

  // Delete the temporary file
  fs.unlinkSync(file.path);


    // Check if email already exists
    const existingTechnician = await Technician.findOne({ email: email });
    if (existingTechnician) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new technician instance
    const newTechnician = new Technician({ image:base64String, name, email, phone, location, category:existingCategory._id, rating: 0, numServicesDone: 0 });

    // Save the technician to the database
    const savedTechnician = await newTechnician.save();

    res.status(201).json(savedTechnician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all technicians
const getAllTechnicians = async (req, res) => {
  try {
    const { categoryId } = req.query;
    console.log(categoryId);
    let technicians;

    if (categoryId) {
      technicians = await Technician.find({ category: categoryId }).populate({
        path:'category',
        ref:'Category'
      });
      console.log(technicians);
    } else {
      technicians = await Technician.find().populate('category', 'name');
    }

    res.json(technicians);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single technician by ID
const getTechnicianById = async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await Technician.findById(id).populate('category', 'name');

    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json(technician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a technician
const updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, email, phone, location, category } = req.body;

    // Check if the new email is already taken by another technician
    const existingTechnician = await Technician.findOne({ email: email, _id: { $ne: id } });
    if (existingTechnician) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updatedTechnician = await Technician.findByIdAndUpdate(
      id,
      {
        image,
        name,
        email,
        phone,
        location,
        available,
        workTime,
        category: existingCategory._id
      },
      { new: true }
    ).populate('category', 'name');

    if (!updatedTechnician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json(updatedTechnician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a technician
const deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTechnician = await Technician.findByIdAndDelete(id);

    if (!deletedTechnician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json({ message: 'Technician deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createTechnician, getAllTechnicians, getTechnicianById, updateTechnician, deleteTechnician };
