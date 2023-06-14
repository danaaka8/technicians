const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users_controller')

router.post('/reset-password', UserController.sendResetPasswordEmail);

router.post('/reset-password/verify', UserController.verifyResetPasswordOTP);

router.get('/users', UserController.getAllUsers);

router.get('/users/:id', UserController.getUser);

router.post('/users', UserController.register);

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

router.post('/users/login', UserController.login);


module.exports = router
