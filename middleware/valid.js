
const ErrorResponse = require('../utils/errorResponse')
// const {Request,Response,NextFunction} = require('express')

 const validRegister = async (req, res, next) =>{
  const {fullname, email, password} = req.body

  if(!fullname){
     res.status(400).json({msg:"Please add your name."})
    return next(new ErrorResponse("Please add your name.", 400))

  }else if(fullname.length > 20){
     res.status(400).json({msg:"Your name is up to 25 chars long."})
    return next(new ErrorResponse("Your name is up to 25 chars long.", 400))
  }

  if(!email){
        res.status(400).json({msg:"Please add your email or phone number."})
    return next(new ErrorResponse("Please add your email or phone number.", 400))
  }else if(!validPhone(email) && !validateEmail(email)){
          res.status(400).json({msg:"Please add your email or phone number."})
    return next(new ErrorResponse("Please add your email or phone number.", 400))
  }

  if(password.length < 6){
        res.status(400).json({msg:"Password must be at least 6 chars."})
    return next(new ErrorResponse("Password must be at least 6 chars.", 400))

  }

  next();


}

function validPhone(phone){
  const re = /^[+]/g
  return re.test(phone)
}

function validateEmail(email){
  const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}


module.exports = validRegister
