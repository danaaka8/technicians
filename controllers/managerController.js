const Manager = require('../models/Managers')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) =>{
    try{
        const { email,password } = req.body
        console.log(email);

        const manager = await Manager.findOne({ email:email,password:password })
    
        if(!manager){
            return res.status(400)
        }

        const token = jwt.sign({
            email:email,
            role:manager.role,
            id:manager._id
        },'ManagerLoginKey',{ expiresIn:'30d' })

        res.status(200).json({
            token:token,
            user:{
                email:email,
                username:manager.username
            }
        })


    }catch(error){

    }
}