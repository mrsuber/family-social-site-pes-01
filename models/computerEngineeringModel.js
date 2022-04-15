const mongoose = require("mongoose")

const computerEngineeringSchema = new mongoose.Schema(
  {

  learningTitle:{type:String,required:true},
  logo:{type:String,default:"https://github.com/mrsuber/family-social-site-pes-01/blob/master/client/src/images/suber_logo1.png?raw=true"},
  path:{type:String,required:true},
  about:{type:String},
  TotalNumberOfBranches:{type:String},
  TotalNumberCompleted:{type:String},
  LessonTittle:[
    {
      title:{type:String},
    },
  ],
  //this is for structure details.
  companyHeadOfficeLocation:{type:String},
  companyLevel1:[
    {
      name:{type:String},
      courseStatus:{type:String},
      courseNumber:{type:String},
      logo:{type:String,default:"https://github.com/mrsuber/family-social-site-pes-01/blob/master/client/src/images/suber_logo1.png?raw=true"},
      menu:[
        {
          name:{type:String},
          detail:{type:String},
          ancorName:{type:String},
        },
      ],
      additionalRead:[
        {
          title:{type:String},
          url:{type:String},
        },
      ],
    },
  ],
  source:[
    {
      name:{type:String},
      link:{type:String},
    },
  ],
  people:[
    {
      name:{type:String}

    },
  ],

},
{timestamps:true}
);

module.exports = mongoose.model("computerEngineering",computerEngineeringSchema)
