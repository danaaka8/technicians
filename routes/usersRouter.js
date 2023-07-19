const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid.v4()}-${file.originalname}`)
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
router.get('/users/user/notifications', UserController.getUserNotifications)

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);
router.delete('/users', UserController.deleteAllUsers);

router.post('/users/login', UserController.login);

router.get('/users/user/favorites',UserController.getAllFavoriteTechnicians)

router.get('/users/user/favorites/isFavorite', UserController.isFavoriteTechnician)
router.delete('/users/favorites/:id',UserController.deleteFavoriteTech)
router.post('/users/favorites/create',UserController.createFavoriteTech)


module.exports = router
