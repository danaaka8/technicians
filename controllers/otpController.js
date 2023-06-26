const Otp = require('../models/otpModel');
const User = require('../models/usersModel');
const bcrypt = require('bcrypt')
const {generateOTP,sendResetPasswordEmail} = require('../utils/emailService')

exports.sendResetCode = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
  
      // Generate and save the reset code
      const code = generateOTP(); // Implement your code generation logic
      const otp = new Otp({ email, code });
      await otp.save();

    sendResetPasswordEmail(email,code)
  
      // Send the reset code to the user (e.g., via email or SMS)
  
      return res.status(200).json({ message: 'Reset code sent successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Verify reset code
exports.verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find the OTP document
    const otp = await Otp.findOne({ email, code });

    if (!otp) {
      return res.status(404).json({ error: 'Invalid reset code' });
    }



    return res.status(200).json({ message: 'Reset code verified successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let x = await User.findOne({ email})

    // Find the user document
    const user = await User.findOneAndUpdate({ email },{
      password:hashedPassword
    },{new:true});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
