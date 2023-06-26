const express = require('express');
const router = express.Router();

const popularTechnicianController = require('../controllers/popularTechnicianController');

// GET all popular technicians
router.get('/popularTechnicians', popularTechnicianController.getAllPopularTechnicians);

// POST add new popular technician
router.post('/popularTechnicians', popularTechnicianController.addNewPopularTechnician);

// DELETE popular technician by ID
router.delete('/popularTechnicians/:id', popularTechnicianController.deletePopularTechnician);

module.exports = router;
