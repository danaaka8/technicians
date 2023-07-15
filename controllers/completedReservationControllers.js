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



    let response = await axios({
      method:"POST",
      url:"https://fcm.googleapis.com/fcm/send",
      headers:{
        'Content-Type':'application/json',
        'Authorization': "key=AAAA5lb3yKE:APA91bFuT_Ut9-5Z0wCJUmYEejppMPdXSgpclNC7kRFz_iLU-JTTsgp5HkAJSlRHuI_K1mh-bopwus4DkdiTf3DCSPHotmAtm_rXUffQq22JbltUljY9G8mtp03-vMFss6LFND-nbm3E"
      },
      data:{
        notification:{
          title:'Zainlak Reservations',
          body:'Your Reservation Is Done'
        },
        to:userX.deviceToken
      }
    })
    console.log(response.status)

    let notifications = userX.notifications
    notifications.push({
      title:"Zainlak Reservations",
      body:"Your Reservations Is Done",
      date:Date.now()
    })


    await User.findOneAndUpdate({ name: user},{
      notifications:notifications
    },{ $new:true })
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
