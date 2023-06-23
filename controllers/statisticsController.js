// statisticsController.js

// Import the necessary models
const User = require('../models/usersModel');
const Technician = require('../models/technicianModel');
const Reservation = require('../models/reservationModel');

// Get number of users
exports.getNumberOfUsers = async (req, res) => {
  try {
    const numberOfUsers = await User.countDocuments();
    return res.status(200).json({ numberOfUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get number of technicians
exports.getNumberOfTechnicians = async (req, res) => {
  try {
    const numberOfTechnicians = await Technician.countDocuments();
    return res.status(200).json({ numberOfTechnicians });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total pending reservations
exports.getTotalPendingReservations = async (req, res) => {
  try {
    const totalPendingReservations = await Reservation.countDocuments({ status: 'pending' });
    return res.status(200).json({ totalPendingReservations });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total reservations
exports.getTotalReservations = async (req, res) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    return res.status(200).json({ totalReservations });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total done reservations
exports.getTotalDoneReservations = async (req, res) => {
  try {
    const totalDoneReservations = await Reservation.countDocuments({ status: 'done' });
    return res.status(200).json({ totalDoneReservations });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total number of users
exports.getTotalNumberOfUsers = async (req, res) => {
  try {
    const totalNumberOfUsers = await User.countDocuments();
    return res.status(200).json({ totalNumberOfUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total number of active users
exports.getTotalNumberOfActiveUsers = async (req, res) => {
  try {
    const totalNumberOfActiveUsers = await User.countDocuments({ status: 'online' });
    return res.status(200).json({ totalNumberOfActiveUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get recent joined users in the last 30 days
exports.getRecentJoinedUsers = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentJoinedUsers = await User.find({ createdAt: { $gte: thirtyDaysAgo } });

    return res.status(200).json({ recentJoinedUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total inactive users
exports.getTotalInactiveUsers = async (req, res) => {
  try {
    const totalInactiveUsers = await User.countDocuments({ status: 'offline' });
    return res.status(200).json({ totalInactiveUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

