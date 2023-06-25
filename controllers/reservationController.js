const Reservation = require('../models/reservationModel');
const Technician = require('../models/technicianModel');

exports.createReservation = async (req, res) => {
  try {
    const { userId, technicianId, date,time } = req.body;
    console.log(req.body);

    // Check if the time slot is available
    const existingReservation = await Reservation.findOne({ technicianId, date,time });
    if (existingReservation) {
      return res.status(409).json({ error: 'Time slot already taken' });
    }

    const reservation = new Reservation({
      userId,
      technicianId,
      date,
      time
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

exports.getUserReservations = async (req, res) => {
    try {
      const { userId } = req.params;

    const userReservations = await Reservation.find({ userId })
      .populate('technicianId');

    // Get the technician data for each reservation
    const technicianIds = userReservations.map(reservation => reservation.technicianId);
    const technicians = await Technician.find({ _id: { $in: technicianIds } });

    // Map the technician data to their respective reservations
    const technicianMap = technicians.reduce((map, technician) => {
      map[technician._id] = technician;
      return map;
    }, {});

    // Add the technician data to the reservations
    const populatedReservations = userReservations.map(reservation => {
      reservation.technicianId = technicianMap[reservation.technicianId._id];
      return reservation;
    });
      console.log(userReservations);
      return res.status(200).json(userReservations);
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