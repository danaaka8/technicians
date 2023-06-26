const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})


const Manager = mongoose.model('Manager',ManagerSchema)

module.exports = Manager