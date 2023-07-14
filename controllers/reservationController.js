const Reservation = require('../models/reservationModel');
const Technician = require('../models/technicianModel');

exports.createReservation = async (req, res) => {
  try {
    const { userId, technicianId, date,time } = req.body;
    console.log(req.body);

    // Check if the time slot is available
    const existingReservation = await Reservation.findOne({ technicianId, date,time });
    if (existingReservation) {
      return res.status(409).send('Sorry This Technician Is Reserved')
    }
    const reservation = new Reservation({
      userId,
      technicianId,
      date,
      time
    });

    await reservation.save();

    return res.status(201).send("Your Booking Was Created");
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId').populate({
      path:'technicianId',
      ref:'Technician',
      populate:{
        path:'category',
        ref:'Category'
      }
    });
    console.log(res);
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;

    const userReservations = await Reservation.find({ userId }).populate('userId');
    const reservations = [];

    for (const reservation of userReservations) {
      try {
        const populatedReservation = await reservation.populate({
          path: 'technicianId',
          ref: 'Technician',
          populate: {
            path: 'category',
            ref: 'Category'
          }
        })

        reservations.push(populatedReservation);
      } catch (error) {
        continue
      }
    }

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

exports.deleteAllReservations = async (req,res) =>{
  try{
    await Reservation.deleteMany({})
    return res.status(200).send("All Reservations Were Deleted")
  }catch (error){
    return res.status(500).send("Failed To Delete Reservations")
  }
}