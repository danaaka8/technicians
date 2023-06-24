const express = require('express')
const router = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })
const UserController = require('../controllers/users_controller')

router.post('/reset-password', UserController.sendResetPasswordEmail);

router.post('/reset-password/verify', UserController.verifyResetPasswordOTP);

router.get('/users', UserController.getAllUsers);

router.put('/users/:id/uploadImage', upload.single('image'),UserController.uploadImage);


router.get('/users/:id', UserController.getUser);

router.post('/users', UserController.register);

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

router.post('/users/login', UserController.login);


module.exports = router
