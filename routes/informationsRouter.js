const express = require('express')
const router = express.Router()

const {
  getAbout,
  getTerms,
  updateAbout,
  updateTerms
} = require('../controllers/informationControlelr')

router.get('/about',getAbout)
router.get('/terms',getTerms)


router.post('/about',updateAbout)
router.post('/terms',updateTerms)


module.exports = router
