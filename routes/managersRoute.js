const express = require('express')
const router = express.Router()

const { login } = require('../controllers/managerController')

router.post('/login',login)

module.exports = router;