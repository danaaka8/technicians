const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
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

router.get('/categories', CategoryController.getAllCategories);

router.get('/categories/:id', CategoryController.getCategory);

router.post('/categories', upload.single('image'),CategoryController.createCategory);

router.put('/categories/:id', CategoryController.updateCategory);

router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;