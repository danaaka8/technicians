const { sendToClient } = require('../websocket');
const CompletedReservation = require('../models/completedReservation');

exports.getCompletedReservations = async (req, res) => {
  try {
    const completedReservations = await CompletedReservation.find();
    return res.status(200).json(completedReservations);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCompletedReservation = async (req, res) => {
  const { completeTime, user, technician, category, price } = req.body;

  try {
    const completedReservation = await CompletedReservation.create({
      completeTime,
      user,
      technician,
      category,
      price
    });

    sendToClient(user,JSON.stringify({
      title:"Zainlak Booking",
      body:"Your Booking Is Done"
    }))

    return res.status(201).json(completedReservation);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCompletedReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await CompletedReservation.findByIdAndRemove(id);
    return res.status(200).json({ message: 'Completed reservation deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
