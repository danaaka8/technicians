const Reservation = require('../models/reservationModel');
const Technician = require('../models/technicianModel');

exports.createReservation = async (req, res) => {
  try {
    const { token } = req.headers
    const { technicianId, date, time } = req.body;

    let decodedToken = jwt.verify(token, 'your-secret-key')

    const existingSameReservation = await Reservation.findOne({
      technicianId,
      userId:decodedToken.userId,
      date,
      time:time.toString()
    })

    if(existingSameReservation){
      return res.status(400).send("You Already Have This Booking")
    }

    const otherExistingReservation = await Reservation.findOne({
      technicianId,
      date,
      time:time.toString()
    })

    if(otherExistingReservation){
      return res.status(400).send("Date Is Taken By Another User")
    }

    const existingDelayedReservations = await Reservation.find({
      technicianId,
      date,
      $or: [
        { time: (time + 1).toString() }, // Check for reservations with time greater than the new reservation
        { time: (time - 1).toString() } // Check for reservations with time less than the new reservation
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

    let response = await axios({
      method:"POST",
      url:"https://fcm.googleapis.com/fcm/send",
      headers:{
        'Content-Type':'application/json',
        'Authorization': "key=AAAA5lb3yKE:APA91bFuT_Ut9-5Z0wCJUmYEejppMPdXSgpclNC7kRFz_iLU-JTTsgp5HkAJSlRHuI_K1mh-bopwus4DkdiTf3DCSPHotmAtm_rXUffQq22JbltUljY9G8mtp03-vMFss6LFND-nbm3E"
      },
      data:{
        notification:{
          title:"Zain Development Reservations",
          body:"Your Reservation Was Created"
        },
        to:userId
      }
    })

    let notification = new NotificationModel({
      userId:userId,
      title:"Zain Development Reservations",
      body:"Your Reservation Was Created"
    })

    await notification.save()

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

const jwt = require('jsonwebtoken')
exports.getUserReservations = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token,'your-secret-key');

    const userReservations = await Reservation.find({ userId: decodedToken.userId }).populate('userId');
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

const NotificationModel = require('../models/notifications')
const axios = require("axios");
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!deletedReservation) {
    //   return res.status(404).json({ error: 'Reservation not found' });
    // }

    let existingReservation = await Reservation.findOne({ _id:id }).populate({
      path:'userId',
      ref:'User'
    })

    if(!existingReservation){
      return res.status(404).send("Reservation Not Found")
    }

    let response = await axios({
      method:"POST",
      url:"https://fcm.googleapis.com/fcm/send",
      headers:{
        'Content-Type':'application/json',
        'Authorization': "key=AAAA5lb3yKE:APA91bFuT_Ut9-5Z0wCJUmYEejppMPdXSgpclNC7kRFz_iLU-JTTsgp5HkAJSlRHuI_K1mh-bopwus4DkdiTf3DCSPHotmAtm_rXUffQq22JbltUljY9G8mtp03-vMFss6LFND-nbm3E"
      },
      data:{
        notification:{
          title:"Zain Development Reservations",
          body:"Your Reservation Was Cancelled"
        },
        to:existingReservation.userId.deviceToken
      }
    })

    let notification = new NotificationModel({
      userId:existingReservation.userId._id,
      title:"Zain Development Reservations",
      body:"Your Reservation Was Cancelled"
    })

    await notification.save()
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.log(error.message)
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