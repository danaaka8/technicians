const Category = require('../models/categoryModel');
const uuid = require("uuid");
const bucket = require("../utils/firebase");
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { __v: false });
    console.log(categories);
    
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;


    if (req.file.filename == '') {
        console.log('errored');
        return res.status(400).json({ error: 'No image file provided' });
      }

    const token = uuid.v4();

    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: token,
      },
      contentType: req.file.mimeType,
      cacheControl: 'public, max-age=315360000000',
    };

    await bucket.upload(`images/${req.file.filename}`, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: metadata,
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/zainfinal-b9de0.appspot.com/o/${req.file.filename}?alt=media&token=${token}5`


    const category = new Category({
      name: name,
      image: url
    });

    const savedCategory = await category.save();

    return res.status(200).json(savedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: name, image: image },
      { new: true }
    );

    if (updatedCategory) {
      return res.status(200).json(updatedCategory);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const SubCategory = require('../models/subCategories')
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (deletedCategory) {
      await SubCategory.deleteMany({ parentCategory: categoryId })
      return res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
