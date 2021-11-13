const Users = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')


const userCtrl = {
  searchUser: async(req,res) =>{
  try{
    const users = await Users.find({username:{$regex:req.query.username}})
    .limit(10).select("fullname username profilePic")
    res.json({users})
  }catch(err){
    res.status(500).json({msg:err.message})
    return next(new ErrorResponse(err.message, 500))

  }
  }
}

module.exports = userCtrl
