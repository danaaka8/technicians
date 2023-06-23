// statisticsRoutes.js

const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/users', statisticsController.getNumberOfUsers);
router.get('/technicians', statisticsController.getNumberOfTechnicians);
router.get('/pending-reservations', statisticsController.getTotalPendingReservations);
router.get('/reservations', statisticsController.getTotalReservations);
router.get('/done-reservations', statisticsController.getTotalDoneReservations);
router.get('/total-users', statisticsController.getTotalNumberOfUsers);
router.get('/active-users', statisticsController.getTotalNumberOfActiveUsers);
router.get('/recent-joined-users', statisticsController.getRecentJoinedUsers);
router.get('/inactive-users', statisticsController.getTotalInactiveUsers);

module.exports = router;
