const mongoose = require('mongoose')

const SubCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    nameAr:{
      type: String,
      required: String,
      unique:true
    },
    price:{
        type:String,
        default:null
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
})


const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;
