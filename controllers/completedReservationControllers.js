const CompletedReservation = require('../models/completedReservation');

exports.getCompletedReservations = async (req, res) => {
  try {
    const completedReservations = await CompletedReservation.find();
    return res.status(200).json(completedReservations);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const User = require('../models/usersModel')
const axios = require('axios')
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
    console.log(user)
    let userX = await User.findOne({ name:user })
    console.log(userX)



    await axios({
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
        to:userX.deviceToken
      }
    }).then((x) => console.log(x))

    let notifications = userX.notifications
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
    console.log(error.message)
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

exports.deleteAllCompletedReservation = async (req,res) =>{
  try{
    await CompletedReservation.deleteMany({})
    return res.status(200).send("All Completed Reservations Were Deleted")
  }catch (error){
    return res.status(500).send("Failed To Delete Completed Reservations")
  }
}
