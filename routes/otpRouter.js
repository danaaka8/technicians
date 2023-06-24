const express = require('express');
const otpController = require('../controllers/otpController');

const router = express.Router();

router.post('/send-reset-code', otpController.sendResetCode);
router.post('/verify-reset-code', otpController.verifyResetCode);
router.post('/change-password', otpController.changePassword);

module.exports = router;