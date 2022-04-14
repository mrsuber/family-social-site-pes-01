const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
  computerEngineering:{type: mongoose.Types.ObjectId, ref:'computerEngineering' },
  religiousStuties:{type: mongoose.Types.ObjectId, ref:'religiousStuties' },
  name:{type:String,required:true},
  learningTitle:{type:String,required:true},
  logo:{type:String,default:"https://github.com/mrsuber/family-social-site-pes-01/blob/master/client/src/images/suber_logo1.png?raw=true"},
  path:{type:String,required:true},
  about:{type:String},
  MainLocation:{type:String},
  TotalNumberOfBranches:{type:String},
  OtherLocations:[
    {
      name:{type:String},
      link:{type:String},
    },
  ],

  JobPost:[
    {
      name:{type:String},
      location:{type:String},
      details:{type:String},
      analysis:{
        status:{type:String},
        jobLocation:{type:String},
        details1:{type:String},
        details2:{type:String},
        details3:{type:String},
        details4:{type:String},
        details5:{type:String},

      },
    },
  ],
  JobPostSources:[
    {
      name:{type:String},
      link:{type:String},
    },
  ],
  courseLink:{type:String},
},{timestamps:true})

module.exports = mongoose.model('school', schoolSchema)
