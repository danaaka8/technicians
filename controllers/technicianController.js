const Technician = require('../models/technicianModel');

// Create a new technician
const createTechnician = async (req, res) => {
  try {
    const { image, name, email, phone, location, category } = req.body;

    // Check if email already exists
    const existingTechnician = await Technician.findOne({ email: email });
    if (existingTechnician) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new technician instance
    const newTechnician = new Technician({ image, name, email, phone, location, category, rating: 0, numServicesDone: 0 });

    // Save the technician to the database
    const savedTechnician = await newTechnician.save();

    res.status(201).json(savedTechnician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
In the updated code, we added a check to see if there is an existing technician with the provided email. If such a technician exists, we return a 400 Bad Request response with an appropriate error message indicating that the email already exists. This prevents the creation of a technician with a duplicated email.





  User
const updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, email, phone, location, category } = req.body;

    const updatedTechnician = await Technician.findByIdAndUpdate(
      id,
      { image, name, email, phone, location, category },
      { new: true }
    );

    if (!updatedTechnician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json(updatedTechnician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

don't update the new email if the new email is already taken by someone and add a custom response for that case
ChatGPT
To prevent updating the email of a technician if the new email is already taken by someone else, you can modify the updateTechnician method as follows:

  javascript
Copy code
const updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, email, phone, location, category } = req.body;

    // Check if the new email is already taken by another technician
    const existingTechnician = await Technician.findOne({ email: email, _id: { $ne: id } });
    if (existingTechnician) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const updatedTechnician = await Technician.findByIdAndUpdate(
      id,
      { image, name, phone, location, category },
      { new: true }
    );

    if (!updatedTechnician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json(updatedTechnician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all technicians
const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single technician by ID
const getTechnicianById = async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await Technician.findById(id);

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

    const updatedTechnician = await Technician.findByIdAndUpdate(
      id,
      { image, name, phone, location, category },
      { new: true }
    );

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
