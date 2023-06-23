const Reservation = require('../models/reservationModel');

exports.createReservation = async (req, res) => {
  try {
    const { userId, technicianId, timeSlot } = req.body;

    // Check if the time slot is available
    const existingReservation = await Reservation.findOne({ technicianId, timeSlot });
    if (existingReservation) {
      return res.status(409).json({ error: 'Time slot already taken' });
    }

    const reservation = new Reservation({
      userId,
      technicianId,
      timeSlot
    });

    const savedReservation = await reservation.save();

    return res.status(201).json(savedReservation);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    return res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};