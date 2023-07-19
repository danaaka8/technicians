const NotificationModel = require('../models/notifications')
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

exports.getAllUserNotifications = async (req,res) => {
    try{
        const { token } = req.headers
        let decodedToken = await jwt.verify(token,'your-secret-key');

        let notifications = await NotificationModel.find({ userId: decodedToken.userId})
        return  res.status(200).json(notifications)
    }catch (error){
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
}

exports.createNotification = async (req,res) =>{
    try {
        const { token } = req.headers
        const { title, body } = req.body

        let decodedToken = await jwt.verify(token,'your-secret-key');
        const notification = new NotificationModel({
            title,
            body,
            userId:decodedToken.userId
        })

        await notification.save()
        return res.sendStatus(200)
    }catch (error){
        return res.sendStatus(500)
    }
}

exports.deleteNotification = async (req,res) =>{
    try {
        const { id } = req.params
        await NotificationModel.findOneAndDelete({ _id: id })
        return res.sendStatus(200)
    }catch (error){
        return res.sendStatus(500)
    }
}