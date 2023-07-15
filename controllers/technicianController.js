const { log } = require('console');
const Technician = require('../models/technicianModel');
const fs = require('fs');
const Category = require('../models/categoryModel')


// Create a new technician
const createTechnician = async (req, res) => {
  try {
    const { name, email, phone, location, category,subCategory, from, to, price } = req.body;
    console.log(req.body);

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

    // Check if email already exists
    const existingTechnician = await Technician.findOne({ email: email });
    if (existingTechnician) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    const token = uuid.v4()

    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: token
      },
      contentType: req.file.mimeType,
      cacheControl: 'public, max-age=31536000000',
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
    console.log(url)


    // Create a new technician instance
    const newTechnician = new Technician({from, to,subCategory, price,image:url, name, email, phone, location, category:existingCategory._id, rating: 0, numServicesDone: 0 });

    // Save the technician to the database
    const savedTechnician = await newTechnician.save();

    res.status(201).json(savedTechnician);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all technicians
const getAllTechnicians = async (req, res) => {
  try {
    const { categoryId } = req.query;
    console.log(categoryId);
    let technicians;

    if (categoryId) {
      technicians = await Technician.find({}).populate({
        path:'category',
        ref:'Category',
        populate:{
          path:'subCategory',
          ref:'SubCategory'
        }
      });


      let filterd = technicians.filter(e => e.category._id.toString() == categoryId)
      return res.status(200).json(filterd)
    } else {
      technicians = await Technician.find().populate({
        path:'category',
        ref:'Category'
      });

      return res.status(200).json(technicians);

    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteAllTechnicians = async (req, res) =>{
  try{
    await Technician.deleteMany({})
    return res.status(200).send("All Technicians Were Deleted")
  }catch (error){
    return res.status(500).send("Failed To Delete All Technicians")
  }
}

// Get a single technician by ID
const getTechnicianById = async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await Technician.findById(id).populate('category', 'name');

    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json(technician);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const uuid = require('uuid')
const bucket = require("../utils/firebase");

const updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, location, category, from, to,price,available } = req.body;
    // Check if the new email is already taken by another technician
    const existingTechnician = await Technician.findOne({ _id:id });
    if (!existingTechnician) {
      return res.status(404).send("User Doesn't Exist");
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const file = req.file;
    let urlImage;


  if (file) {
    const token = uuid.v4()

    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: token
      },
      contentType: req.file.mimeType,
      cacheControl: 'public, max-age=31536000000',
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
    urlImage = url;
    console.log(url)
  }else{
    urlImage = existingTechnician.image
  }




    const updatedTechnician = await Technician.findOneAndUpdate(
      {email:email},
      {
        image:urlImage,
        name,
        email,
        phone,
        location,
        available,
        price,
        category: existingCategory._id,
        from:from,
        to:to
      },
      { $new: true }
    );

    if (!updatedTechnician) {
      return res.status(500).send("Technician Wasn't Updated")
    }

    res.status(200).send("Technician Was Updated");
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error");
  }
};

// Delete a technician
const deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTechnician = await Technician.findByIdAndDelete(id);

    if (!deletedTechnician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json({ message: 'Technician deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createTechnician, getAllTechnicians, getTechnicianById, updateTechnician, deleteTechnician, deleteAllTechnicians };
