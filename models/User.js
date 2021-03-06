const crypto = require('crypto');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
  fullname:{
    type:String,
    trim:true,
    maxlength:25
  },
  username:{
    type:String,
    required:[true,"please provide a username  "],
    unique:true
  },
  email:{
    type:String,
    required:[true,"please provide an email"],
    trim:true,
    unique:true,
    match:[
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
       "Please fill valid email address"
    ]
  },
  password:{
    type:String,
    required:[true,"Please add a password"],
    minlength:6,
    select:false
  },
  profilePic:{type:String,default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"},
  role:{type:String,default:'user'},
  gender:{type:String,default:'male'},
  mobile:{type:String,default:''},
  address:{type:String,default:''},
  story:{
    type:String,
    default:'',
    maxlength:200

  },
  website:{type:String,default:''},
  saved:[
    {
    type:mongoose.Types.ObjectId,
    ref:'user'
  }
],
  followers:[
    {
    type:mongoose.Types.ObjectId,
    ref:'user'
  }
],
  following:[
    {
      type:mongoose.Types.ObjectId,
      ref:'user'
    }
  ],
  isApplication1:{type:Boolean,default:false},
  isApplication2:{type:Boolean,default:false},
  isApplication3:{type:Boolean,default:false},
  isStudentTech:{type:Boolean,default:false},
  isStudentRel:{type:Boolean,default:false},
  isAdmin:{type:Boolean,default:false},
  isSuperAdmin:{type:Boolean,default:false},
  resetPasswordToken: String,
  resetPasswordExpire:Date
},
{timestamps:true})

//midile ware to hash the password
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next()
  }

  const salt =await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
  next();
})

UserSchema.methods.matchPasswords = async function(password){
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

UserSchema.methods.refreshToken = function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn:'30d'})
}

UserSchema.methods.getResetPasswordToken = function(){
  const resetToken= crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10*(60*1000)
  return resetToken;
}

const User = mongoose.model("user",UserSchema);

module.exports=User;
