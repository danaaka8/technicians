const express = require('express');
const router = express.Router();
const completedReservationController = require('../controllers/completedReservationControllers');

router.get('/', completedReservationController.getCompletedReservations);
router.post('/', completedReservationController.createCompletedReservation);
router.delete('/:id', completedReservationController.deleteCompletedReservation);
router.delete('/', completedReservationController.deleteAllCompletedReservation);

module.exports = router;
