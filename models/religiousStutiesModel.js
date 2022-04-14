const mongoose = require("mongoose")

const religiousStutiesSchema = new mongoose.Schema(
  {
  name:{type:String,required:true},

},
{timestamps:true}
);

module.exports = mongoose.model("religiousStuties",religiousStutiesSchema)
