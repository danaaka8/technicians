const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    title:{
        type: String,
        required: true
    },

    body:{
        type: String,
        required: true
    },

    createdAt:{
        type:Number,
        default:Date.now()
    },

    redirectionString:{
        type:String,
        default: null
    }
})

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
