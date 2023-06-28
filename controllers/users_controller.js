const bcrypt = require('bcrypt');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail, generateOTP } = require('../utils/emailService');

exports.sendResetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = generateOTP();

    // Send email with OTP
    sendResetPasswordEmail(email, otp);

    // Save the OTP in the user's document
    user.resetPasswordOTP = otp;
    await user.save();

    return res.status(200).json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyResetPasswordOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.resetPasswordOTP !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, 'ManagerLoginKey');
    const role = decodedToken.role;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const users = await User.find({}, { __v: false });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, location, phone } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      location: location,
      phone:phone
    });

    const savedUser = await newUser.save();



    return res.status(200).json({ user: savedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: 'user' },
        'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.status(200).json({ token: token, user: user });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your-secret-key');
    const authenticatedUserId = decodedToken.userId;
    const role = decodedToken.role;

    if (role === 'user' && userId !== authenticatedUserId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ error: 'Email already exists with another user' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name, email: email },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const fs = require('fs');

exports.uploadImage = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      log('here')
      return res.status(400).json({ error: 'No image file provided' });
    }

    const image = fs.readFileSync(req.file.path, { encoding: 'base64' });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const Technician = require('../models/technicianModel')

exports.getAllFavoriteTechnicians = async (req,res) =>{
  const techs = JSON.parse(req.body.techs)
  console.log(techs);
  techsArr = []

  try{
    for(tech of techs){
      console.log(tech);
      let data = await Technician.findOne({ _id:tech }).populate({
        path:'category',
        ref:'Category'
      });
      techsArr.push(data)
    }

    return res.status(200).json(techsArr)
  }catch{
    return res.status(500).send('something went wrong')
  }
}


exports.createFavoriteTech = async (req,res) =>{
  const { userId,id } = req.body

  try{
    let user = await User.findOne({ _id:userId })
    let techs = user.favorites
    techs.push(id)

    await User.findOneAndUpdate({_id:userId},{
      favorites:techs
    },{new:true})

    res.json(techs)
  }catch{
    res.status(500).send('something went wrong')
  }
}

exports.deleteFavoriteTech = async (req,res) =>{
  const { id } = req.params
  const { userId } = req.body


  try{
    let user = await User.findOne({ _id:userId })
    let techs = user.favorites
    let filtered = techs.filter(t => t != id)

    await User.findOneAndUpdate({_id:userId},{
      favorites:filtered
    },{new:true})

    res.json(filtered)
  }catch{
    res.status(500).send('something went wrong')
  }


}