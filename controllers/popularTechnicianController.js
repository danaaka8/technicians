const Category = require('../models/categoryModel');
const Technician = require('../models/technicianModel');
const Popular = require('../models/popularTechnicianModel')
const uuid = require("uuid");
const bucket = require("../utils/firebase");

exports.getAllPopularTechnicians = async (req, res) => {
  try {
    const popularTechnicians = await Popular.find({});
    return res.status(200).json(popularTechnicians);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPopularTechnician = async (req,res) =>{
  try{
    const { id } = req.params
    console.log(id)
    let popular = await Popular.findOne({ _id: id })
    return res.status(200).json(popular)
  }catch (error){
    console.log(error.message)
    return  res.status(500).json({})
  }
}

exports.updatePopularTechnician = async (req,res) =>{
  try{
    const { name, description, price } = req.body
    const { id } = req.params

    if(req.file){
      const token = uuid.v4()

      const metadata = {
        metadata: {
          // This line is very important. It's to create a download token.
          firebaseStorageDownloadTokens: token
        },
        contentType: req.file.mimeType,
        cacheControl: 'public, max-age=31536000',
      };



      await bucket.upload(`images/${req.file.filename}`, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        metadata: metadata,
      });


      const file = bucket.file(req.file.filename);
      const options = {
        action: 'read',
        expires: Date.now() + 3600000, // Link expires in 1 hour
      };

      const [url] = await file.getSignedUrl(options);

      await Popular.findOneAndUpdate({_id:id},{
        name,description,price,
        image:url
      },{ $new: true })
      return res.status(200).send("Product Is Updated")
    }
    await Popular.findOneAndUpdate({_id:id},{
      name,description,price
    },{ $new: true })
    return res.status(200).send("Product Is Updated")
  }catch (error){
    return  res.status(500).send("Error Updating The Product, Internal Server Error")
  }
}

exports.addNewPopularTechnician = async (req, res) => {
  try {
    const { name, description, price, link } = req.body;


    // Check if the technician exists
    const technician = await Popular.findOne({ name });
    if(technician){
      return res.status(400).send("Product Already Exists, Choose Another Name")
    }

    if(!req.file){
      return  res.status(400).send("Failed To Add Product, Please Provide An Image")
    }

    const token = uuid.v4()

    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: token
      },
      contentType: req.file.mimeType,
      cacheControl: 'public, max-age=31536000',
    };



    await bucket.upload(`images/${req.file.filename}`, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: metadata,
    });


    const file = bucket.file(req.file.filename);
    const options = {
      action: 'read',
      expires: Date.now() + 3600000, // Link expires in 1 hour
    };

    const [url] = await file.getSignedUrl(options);

    let product = new Popular({ name,link, description, price,image:url })
    await product.save()
    return res.status(201).send("Product Was Created Successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

exports.deletePopularTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    await Popular.deleteOne(({ _id: id }))
    return res.status(200).send("Product Was Deleted");
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

exports.deleteAllPopularTechnician = async (req, res) => {
  try {
    await Popular.deleteMany({})
    return res.status(200).send("All Products Were Deleted");
  } catch (error) {
    return res.status(500).send('Internal server error, Failed To Delete All Products');
  }
};
