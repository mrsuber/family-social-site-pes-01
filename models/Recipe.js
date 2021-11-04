const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema(
  {
  name:{type:String,required:true},
  category:{type:String,required:true},
  price:{type:String,required:true},
  desc:{type:String,required:true},

  fileName:{
    type:String,
    required:true
  },
  filePath:{
    type:String,
    required:true
  },
  fileType:{
    type:String,
    required:true
  },
  fileSize:{
    type:String,
    required:true
  }
},
{timestamps:true}
);

module.exports = mongoose.model("Recipe",RecipeSchema)
