const Posts = require('../models/postModel')
const ErrorResponse = require('../utils/errorResponse')


const postCtrl = {
  createPost: async (req,res) =>{
    try{
      const {content, images} = req.body

      if(images.length === 0){
        res.status(400).json({msg:"Please add your photo"})
        return next(new ErrorResponse("Please add your photo", 400))
      }

      const newPost = new Posts({
        content, images, user:req.user._id
      })

      await newPost.save()
      res.json({
        msg:'Create Post!',
        newPost
      })
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getPosts: async (req,res) =>{

    try{

        const posts = await Posts.find({user:[...req.user.following, req.user._id]}).sort('-createdAt').populate("user likes","profilePic username fullname")
        res.status(200).json({msg:'Success!', result:posts.length,posts})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  updatePost: async (req,res) =>{
    try{
    const {content , images }= req.body
    const post = await Posts.findOneAndUpdate({_id:req.params.id},{content,images}).populate("user likes","profilePic username fullname")
    res.json({
      msg:'Updated Post!',
      newPost:{...post._doc, content, images}
    })
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },


}

module.exports = postCtrl
