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
},

  getUser: async (req,res) => {
    try{
      const user = await Users.findById(req.params.id).select('-password')
      if(!user){
        res.status(400).json({msg:"User does not exist"})
        return next(new ErrorResponse({msg:"User does not exist"}, 400))
      }
      res.status(200).json({user})

    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },

  updateUser: async (req,res)=>{
    try{
      const {profilePic,fullname,mobile,address,story,website,gender} = req.body
      if(!fullname) {
        res.status(400).json({msg:"Please add your full name"})
        return next(new ErrorResponse({msg:"Please add your full name"}, 400))
      }
      await Users.findOneAndUpdate({_id:req.user._id},{profilePic,fullname,mobile,address,story,website,gender})
      res.status(200).json({msg:"Update Success!"})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  }

}

module.exports = userCtrl
