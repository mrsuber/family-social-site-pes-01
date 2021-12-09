const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')
const ErrorResponse = require('../utils/errorResponse')



const commentCtrl = {
  createComment: async (req,res) =>{
    try{
      const {postId, content, tag, reply} = req.body

      const newComment = new Comments({
        user:req.user._id, content, tag, reply
      })

      await Posts.findOneAndUpdate({_id:postId},{
        $push:{comments:newComment._id}
      },{new:true})

      await newComment.save()
      res.json({newComment})

    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },

  updateComment: async (req,res) =>{
    try{

      const {content} = req.body
      await Comments.findOneAndUpdate({_id:req.params.id, user:req.user._id},{content})

      res.status(200).json({msg:'Update Success!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  likeComment: async (req,res) =>{
    try{
      const comment = await Comments.find({_id:req.params.id, likes: req.user._id})
      if(comment.length >0){
        res.status(400).json({msg:"You liked this comment."})
        return next(new ErrorResponse("You liked this comment", 400))
      }
    await Comments.findOneAndUpdate({_id:req.params.id},{
      $push:{likes:req.user._id}
    }, {new:true})
    res.json({msg:'Liked Comment!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  unlikeComment: async (req,res) =>{
    try{

    await Comments.findOneAndUpdate({_id:req.params.id},{
      $pull:{likes:req.user._id}
    }, {new:true})
    res.json({msg:'UnLiked Comment!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },


}


module.exports = commentCtrl
