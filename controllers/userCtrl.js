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
      const user = await Users.findById(req.params.id).select('-password').populate("followers following")

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
  },

  follow: async (req,res)=>{

    try{
      const user = await Users.find({_id:req.params.id,followers:req.user._id})
      if(user.length > 0){
        res.status(400).json({msg:"You followed this user."})
        return next(new ErrorResponse("You followed this user", 400))
      }
      await Users.findOneAndUpdate({_id:req.params.id},{ $push:{followers:req.user._id } },{new:true})

      await Users.findOneAndUpdate({_id:req.user._id},{$push:{following:req.params.id } },{new:true})
      res.status(200).json({msg:"Followed User."})

    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },

  unfollow: async (req,res)=>{

    try{

      await Users.findOneAndUpdate({_id:req.params.id},{  $pull:{followers:req.user._id }   },{new:true})

      await Users.findOneAndUpdate({_id:req.user._id},{ $pull:{following:req.params.id }  },{new:true})
      res.status(200).json({msg:"UnFollow User."})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  suggestionsUser:async (req,res)=>{

    try{
      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 10

      const users = await Users.aggregate([
        {$match: {_id: { $nin: newArr }}},
        {$sample: { size: Number(num) }},
        {$lookup: { from: "users", localField: 'followers', foreignField: '_id', as: 'followers' }},
        {$lookup: { from: "users", localField: 'following', foreignField: '_id', as: 'following' }},
      ]).project("-password")

      return res.status(200).json({
        users,
        result: users.length
      })
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  }

}

module.exports = userCtrl
