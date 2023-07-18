const Reservation = require('../models/reservationModel');
const Technician = require('../models/technicianModel');

exports.createReservation = async (req, res) => {
  try {
    const { userId, technicianId, date, time } = req.body;

    const existingSameReservation = await Reservation.findOne({
      technicianId,
      userId,
      date,
      time
    })

    if(existingSameReservation){
      return res.status(400).send("You Already Have This Booking")
    }

    const existingDelayedReservations = await Reservation.find({
      technicianId,
      date,
      $or: [
        { time: { $gt: +time } }, // Check for reservations with time greater than the new reservation
        { time: { $lt: +time } } // Check for reservations with time less than the new reservation
      ]
    });

    if (existingDelayedReservations.length > 0) {
      return res.status(409).send('Please try another time');
    }

    const reservation = new Reservation({
      userId,
      technicianId,
      date,
      time
    });

    await reservation.save();

    return res.status(201).send('Your booking was created');
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
          populate: [
            { path: 'category', ref: 'Category' },
            { path: 'subCategory', ref: 'SubCategory' }
          ]
        })

        reservations.push(populatedReservation);
      } catch (error) {
        console.log(error.message)
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