const express = require('express');
const router = express.Router();

const popularTechnicianController = require('../controllers/popularTechnicianController');
const uuid = require('uuid')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid.v4()}-${file.originalname}`)
    },
})

const upload = multer({ storage: storage })

// GET all popular technicians
router.get('/popularTechnicians', popularTechnicianController.getAllPopularTechnicians);

// POST add new popular technician
router.post('/popularTechnicians',upload.single('image'), popularTechnicianController.addNewPopularTechnician);

// DELETE popular technician by ID
router.delete('/popularTechnicians/:id', popularTechnicianController.deletePopularTechnician);

module.exports = router;
