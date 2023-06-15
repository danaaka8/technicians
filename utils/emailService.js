const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aloshhasso99944@gmail.com',
    pass: 'cixvvdrknowojpye'
  }
});

exports.sendResetPasswordEmail = (email, otp) => {
  const mailOptions = {
    from: 'aloshhasso99944@gmail.com',
    to: email,
    subject: 'Reset Password',
    text: `Your OTP for password reset is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

exports.generateOTP = () => {
  const OTP_LENGTH = 6;
  const otp = randomstring.generate({
    length: OTP_LENGTH,
    charset: 'numeric'
  });

  return otp;
};
