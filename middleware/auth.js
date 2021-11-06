const jwt = require("jsonwebtoken")
const User=require('../models/User');
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async (req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token=req.headers.authorization.split(" ")[1]

  }
  if(!token){
    res.status(401).json({msg:"Not authorized to acess this route(no token)"})
    return next(new ErrorResponse("Not authorized to acess this route(no token)",401))
  }
  try{

    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user =  await User.findById(decoded.id)

    if(!user){
      res.status(404).json({msg:"No user found with this id"})
      return next(new ErrorResponse("No user found with this id",404));
    }

    req.user =user
    next()
  }catch(error){
    // console.error(error);
    res.status(401).json({msg:"Not authorized to access this root(strang error)"})
    return next(new ErrorResponse("Not authorized to access this root(strang error)",401) )
  }
}
