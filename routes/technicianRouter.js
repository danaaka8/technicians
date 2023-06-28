const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// Get all technicians
router.get('/technicians', technicianController.getAllTechnicians);


// Get a technician by ID
router.get('/technicians/:id', technicianController.getTechnicianById);

// Create a new technician
router.post('/technicians', upload.single('image'),technicianController.createTechnician);

// Update a technician
router.put('/technicians/:id',upload.single('image'), technicianController.updateTechnician);

// Delete a technician
router.delete('/technicians/:id', technicianController.deleteTechnician);

module.exports = router;
