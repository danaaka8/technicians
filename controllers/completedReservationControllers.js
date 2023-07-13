const CompletedReservation = require('../models/completedReservation');
const axios = require('axios')

exports.getCompletedReservations = async (req, res) => {
  try {
    const completedReservations = await CompletedReservation.find();
    return res.status(200).json(completedReservations);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const User = require('../models/usersModel')

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
    let user = await User.findOne({ _id:user })


    await this.axios({
      method:"POST",
      url:"https://fcm.googleapis.com/fcm/send",
      headers:{
        'Content-Type':'application/json',
        'Authorization': "key=AAAAEKeP2q0:APA91bGZ4JHp8ZRAICOomqQXTJHnYskPiAAXYC8kzUGwxRVlUM2ZKm-Dh_PkTUmV90gjj-eq-IbILDNgex59_vx-15QfspQtzAXwk_q4naK-nhcHMT9wwYipisGc3PpdxM7Oxfo1zets"
      },
      data:{
        notification:{
          title:'Zainlak Reservations',
          body:'Your Reservation Is Done'
        },
        to:user.deviceToken
      }
    })

    let notifications = user.notifications
    notifications.push({
      title:"Zainlak Reservations",
      body:"Your Reservations Is Done",
      date:Date.now()
    })


    // await User.findOneAndUpdate({ _id: user},{
    //   notifications:notifications
    // },{ $new:true })
    //
    // return res.status(201).json(completedReservation);
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
