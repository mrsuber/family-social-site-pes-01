const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const ErrorResponse = require('../utils/errorResponse')
const Users = require('../models/User')

class APIfeatures {
  constructor(query,queryString){
    this.query = query;
    this.queryString = queryString;
  }

  paginating(){
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

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
        newPost:{
          ...newPost._doc,
          user: req.user
        }
      })
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getPosts: async (req,res) =>{

    try{
        const features = new APIfeatures(Posts.find({user:[...req.user.following, req.user._id]}),req.query).paginating()
        const posts = await features.query.sort('-createdAt')
        .populate("user likes","profilePic username fullname followers")
        .populate({
          path:"comments",
          populate:{
            path: "user likes",
            select:"-password"
          }
        })
        res.status(200).json({msg:'Success!', result:posts.length,posts})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  updatePost: async (req,res) =>{
    try{
    const {content , images }= req.body
    const post = await Posts.findOneAndUpdate({_id:req.params.id},{content,images})
    .populate("user likes","profilePic username fullname")
    .populate({
      path:"comments",
      populate:{
        path: "user likes",
        select:"-password"
      }
    })
    res.json({
      msg:'Updated Post!',
      newPost:{...post._doc, content, images}
    })
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  likePost: async (req,res) =>{
    try{
      const post = await Posts.find({_id:req.params.id, likes: req.user._id})
      if(post.length >0){
        res.status(400).json({msg:"You liked this post."})
        return next(new ErrorResponse("You liked this post", 400))
      }
    const like = await Posts.findOneAndUpdate({_id:req.params.id},{
      $push:{likes:req.user._id}
    }, {new:true})

    if(!like){
      res.status(400).json({msg:"This post does not exist"})
      return next(new ErrorResponse("This post does not exist", 400))
    }
    res.status(200).json({msg:'Liked Post!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  unlikePost: async (req,res) =>{
    try{

    const like = await Posts.findOneAndUpdate({_id:req.params.id},{
      $pull:{likes:req.user._id}
    }, {new:true})

    if(!like){
      res.status(400).json({msg:"This post does not exist"})
      return next(new ErrorResponse("This post does not exist", 400))
    }
    res.status(200).json({msg:'UnLiked Post!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getUserPosts: async (req, res) =>{
    try{
      const features = new APIfeatures(Posts.find({user:req.params.id}),req.query).paginating()
      const posts = await features.query.sort("-createdAt")
      res.status(200).json({
        posts,
        result:posts.length
      })
      }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getPost: async (req,res)=>{
    try{
      const post = await Posts.findById(req.params.id)
      .populate("user likes","profilePic username fullname")
      .populate({
        path:"comments",
        populate:{
          path: "user likes",
          select:"-password"
        }
      })

      if(!post){
        res.status(400).json({msg:"This post does not exist"})
        return next(new ErrorResponse("This post does not exist", 400))
      }

      res.status(200).json({ post})
      }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getPostsDiscover:async (req, res) =>{
    try{
      // const features = new APIfeatures(Posts.find({
      //   user:{$nin: [...req.user.following, req.user._id]}
      // }),req.query).paginating()
      //
      // const posts = await features.query.sort('-createdAt')

      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 9

      const posts = await Posts.aggregate([
        {$match: {user: { $nin: newArr }}},
        {$sample: { size: Number(num) }},
      ])



      return res.status(200).json({msg:'Success!', result:posts.length,posts})
      }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  deletePost: async (req, res) =>{
    try{
      const post = await Posts.findOneAndDelete({_id:req.params.id, user:req.user._id})
      await Comments.deleteMany({_id:{$in:post.comments}})

      res.status(200).json({
        msg:"Deleted Post!",
        newPost:{
          ...post,
          user:req.user
        }
      })
      }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  savePost: async (req,res) =>{
    try{
      const user = await Users.find({_id:req.user._id, saved: req.params.id})
      if(user.length >0){
        res.status(400).json({msg:"You saved this post."})
        return next(new ErrorResponse("You saved this post", 400))
      }
    const save = await Users.findOneAndUpdate({_id:req.user._id},{
      $push:{saved:req.params.id}
    }, {new:true})

    if(!save){
      res.status(400).json({msg:"This user does not exist"})
      return next(new ErrorResponse("This user does not exist", 400))
    }
    res.status(200).json({msg:'Saved Post!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  unSavePost: async (req,res) =>{
    try{

    const save = await Users.findOneAndUpdate({_id:req.user._id},{
      $pull:{saved:req.params.id}
    }, {new:true})

    if(!save){
      res.status(400).json({msg:"This user does not exist"})
      return next(new ErrorResponse("This user does not exist", 400))
    }
    res.status(200).json({msg:'unSaved Post!'})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getSavePosts: async (req,res) =>{
    try{
      const features = new APIfeatures(Posts.find({
        _id:{$in:req.user.saved}
      }),req.query).paginating()

      const savePosts = await features.query.sort("-createdAt")

      res.status(200).json({
        savePosts,
        result:savePosts.length
      })
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  }


}

module.exports = postCtrl
