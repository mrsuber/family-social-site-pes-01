const Statistics = require('../models/Statistics')
const ErrorResponse = require('../utils/errorResponse')


const welcomeCtrl = {
  welcomeMsg: async(req,res) =>{
    console.log(req.socket.remoteAddress);
  console.log(req.ip);
    res.status(200).json({ip:req.ip})
    // res.send("your IP is: " + req.ip)
  try{

  }catch(err){
    res.status(500).json({msg:err.message})
    return next(new ErrorResponse(err.message, 500))

  }
},



}

module.exports = welcomeCtrl
