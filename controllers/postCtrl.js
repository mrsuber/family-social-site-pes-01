const Post = require('../models/postModel')
const ErrorResponse = require('../utils/errorResponse')


const postCtrl = {
  createPost: async (req,res) =>{
    try{
      const {content, images} = req.body
      const newPost = new Post({
        content, images
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
  }
}

module.exports = postCtrl
