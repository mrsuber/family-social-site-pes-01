const crypto = require("crypto")
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
//register user
exports.register= async (req,res,next)=>{

  try{
    let {username,email,password} = req.body;
     username = username.toLowerCase().replace(/ /g,'')


    const username1 = await User.findOne({username:username})
    const email1 = await User.findOne({email:email})

    if(username1){
      res.status(400).json({msg:"This username already exits."})
      return next(new ErrorResponse("This username already exits.", 400))

    }
    if(email1){
      res.status(400).json({msg:"This email already exits."})
      return next(new ErrorResponse("This email already exits.", 400))
    }

    if(password.length < 6){
      res.status(400).json({msg:"Password mustbe at least 6 characters"})
      return next(new ErrorResponse("Password mustbe at least 6 characters", 400))

    }


    const user= await User.create({
      username,email,password
    })

    sendToken(user, 201,res)
  }catch(error){
    // next(error)
    res.status(500).json({msg:error.message})
    return next(new ErrorResponse(error.message, 500))



  }
}



//login user
exports.login= async (req,res,next)=>{
  const {email,password} = req.body;
  if(!email || !password){
    res.status(400).json({msg:"please provide an email and password"})
    return next(new ErrorResponse("please provide an email and password", 400))
  }

  try{
    const user = await User.findOne({email}).select("+password")
    // const user = await User.findOne({email}).populate("followers following","-password")
    if(!user){
      res.status(401).json({msg:"Invalid credentialls"})
      return next(new ErrorResponse("Invalid credentials",401))

    }

    const isMatch = await user.matchPasswords(password)

    if(!isMatch){
      res.status(401).json({msg:"Invalid Login credentialls"})
      return next(new ErrorResponse("Invalid Login credentials",401))

    }


    sendToken(user, 200,res)
  }catch(error){

  }
}

//reset user password
exports.forgotpassword= async (req,res,next)=>{
  const {email} = req.body;

  try{
    const user=await User.findOne({email})

    if(!user){
      res.status(404).json({msg:"Email could not be sent"})
      return next(new ErrorResponse("Email could not be sent",404))
    }
    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
    console.log(resetUrl)
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password </p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try{
      await sendEmail({ to:user.email, subject:"Password Reset Request",text:message   })

      res.status(200).json({success:true, data:"Email sent"})
    }catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(500).json({msg:"Email could not be sent"})

      return next(new ErrorResponse("Email could not be sent",500))
    }
  }catch(error){
    next(error)
  }
}

//password reset done
exports.resetpassword= async (req,res,next)=>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  try{
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user){
      return next(new ErrorResponse("Invalid Reset Token",400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    res.status(201).json({
      success:true,
      data:"Password Reset Success"
    })

  }catch(error){
    next(error)
  }
}

exports.logout = async (req,res) =>{
  res.status(200).json("still working on the logout route")
}
exports.generateFreshToken=async (req,res)=>{
  res.status(200).json("still working on the generate new token  route")

}

const sendToken = (user,statusCode,res) =>{
  const token = user.getSignedToken()
  // const refresh_token= user.refreshToken()
  // res.cookie("refreshtoken",refresh_token,{
  //   httpOnly:true,
  //   path:'/api/auth/refresh_token',
  //   maxAge:30*24*60*60*1000
  // })
  res.status(statusCode).json({
    success:true,
    token,
    user:{
      ...user._doc,
      password:''
    }
  })
}
