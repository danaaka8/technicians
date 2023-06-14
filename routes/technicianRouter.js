const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');

// Get all technicians
router.get('/technicians', technicianController.getAllTechnicians);


// Get a technician by ID
router.get('/technicians/:id', technicianController.getTechnicianById);

// Create a new technician
router.post('/technicians', technicianController.createTechnician);

// Update a technician
router.put('/technicians/:id', technicianController.updateTechnician);

// Delete a technician
router.delete('/technicians/:id', technicianController.deleteTechnician);

module.exports = router;
