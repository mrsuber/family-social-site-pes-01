const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')
const ErrorResponse = require('../utils/errorResponse')



const commentCtrl = {
  createComment: async (req,res) =>{
    try{
      const {postId, content, tag, reply,postUserId} = req.body

      const post = await Posts.findById(postId)
      if(!post){
        res.status(400).json({msg:"This Post does not exist."})
        return next(new ErrorResponse("This Post does not exist.", 400))
      }

      if(reply){
        const cm = await Comments.findById(reply)
        if(!cm){
          res.status(400).json({msg:"This comment does not exist."})
          return next(new ErrorResponse("This comment does not exist.", 400))
        }
      }

      const newComment = new Comments({
        user:req.user._id, content, tag, reply,postUserId,postId
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
  deleteComment: async (req,res)=>{
    try{
      const comment = await Comments.findOneAndDelete({
        _id:req.params.id,
        $or:[
          {user:req.user._id},
          {postUserId:req.user._id}
        ]
      })

      await Posts.findOneAndUpdate({_id:comment.postId},{
        $pull:{comments:req.params.id}
      })
      res.status(200).json({msg:'Deleted Comment!'})

    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  }


}


module.exports = commentCtrl
