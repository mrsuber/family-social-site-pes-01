const { Op } = require('sequelize')
const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const ErrorResponse = require('../utils/errorResponse')
const Users = require('../models/User')
const { sequelize } = require('../config/db')

class APIfeatures {
  constructor(model, queryString, whereClause = {}) {
    this.model = model;
    this.queryString = queryString;
    this.whereClause = whereClause;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const offset = (page - 1) * limit
    this.offset = offset;
    this.limit = limit;
    return this;
  }

  async execute() {
    return await this.model.findAll({
      where: this.whereClause,
      limit: this.limit,
      offset: this.offset,
      order: [['createdAt', 'DESC']]
    });
  }
}

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body

      if (images.length === 0) {
        res.status(400).json({ msg: "Please add your photo" })
        return next(new ErrorResponse("Please add your photo", 400))
      }

      const newPost = await Posts.create({
        content,
        images,
        userId: req.user.id
      })

      res.json({
        msg: 'Create Post!',
        newPost: {
          ...newPost.toJSON(),
          user: req.user
        }
      })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getPosts: async (req, res) => {
    try {
      const currentUser = await Users.findByPk(req.user.id)
      const userIds = [...(currentUser.following || []), req.user.id]

      const features = new APIfeatures(Posts, req.query, {
        userId: { [Op.in]: userIds }
      }).paginating()

      const posts = await features.execute()

      res.status(200).json({ msg: 'Success!', result: posts.length, posts })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body
      const post = await Posts.findByPk(req.params.id)

      if (!post) {
        res.status(400).json({ msg: "This post does not exist" })
        return next(new ErrorResponse("This post does not exist", 400))
      }

      await post.update({ content, images })

      res.json({
        msg: 'Updated Post!',
        newPost: post
      })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Posts.findByPk(req.params.id)

      if (!post) {
        res.status(400).json({ msg: "This post does not exist" })
        return next(new ErrorResponse("This post does not exist", 400))
      }

      if (post.likes && post.likes.includes(req.user.id)) {
        res.status(400).json({ msg: "You liked this post." })
        return next(new ErrorResponse("You liked this post", 400))
      }

      const updatedLikes = [...(post.likes || []), req.user.id]
      await post.update({ likes: updatedLikes })

      res.status(200).json({ msg: 'Liked Post!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  unlikePost: async (req, res) => {
    try {
      const post = await Posts.findByPk(req.params.id)

      if (!post) {
        res.status(400).json({ msg: "This post does not exist" })
        return next(new ErrorResponse("This post does not exist", 400))
      }

      const updatedLikes = (post.likes || []).filter(id => id !== req.user.id)
      await post.update({ likes: updatedLikes })

      res.status(200).json({ msg: 'UnLiked Post!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeatures(Posts, req.query, {
        userId: req.params.id
      }).paginating()

      const posts = await features.execute()

      res.status(200).json({
        posts,
        result: posts.length
      })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Posts.findByPk(req.params.id)

      if (!post) {
        res.status(400).json({ msg: "This post does not exist" })
        return next(new ErrorResponse("This post does not exist", 400))
      }

      res.status(200).json({ post })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getPostsDiscover: async (req, res) => {
    try {
      const currentUser = await Users.findByPk(req.user.id)
      const excludeIds = [...(currentUser.following || []), req.user.id]
      const num = req.query.num || 9

      const posts = await Posts.findAll({
        where: {
          userId: { [Op.notIn]: excludeIds }
        },
        limit: Number(num),
        order: sequelize.random()
      })

      return res.status(200).json({ msg: 'Success!', result: posts.length, posts })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })

      if (!post) {
        res.status(400).json({ msg: "This post does not exist or you don't have permission" })
        return next(new ErrorResponse("This post does not exist or you don't have permission", 400))
      }

      // Delete associated comments
      if (post.comments && post.comments.length > 0) {
        await Comments.destroy({
          where: {
            id: { [Op.in]: post.comments }
          }
        })
      }

      await post.destroy()

      res.status(200).json({
        msg: "Deleted Post!",
        newPost: {
          ...post.toJSON(),
          user: req.user
        }
      })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  savePost: async (req, res) => {
    try {
      const user = await Users.findByPk(req.user.id)

      if (user.saved && user.saved.includes(req.params.id)) {
        res.status(400).json({ msg: "You saved this post." })
        return next(new ErrorResponse("You saved this post", 400))
      }

      const updatedSaved = [...(user.saved || []), req.params.id]
      await user.update({ saved: updatedSaved })

      res.status(200).json({ msg: 'Saved Post!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  unSavePost: async (req, res) => {
    try {
      const user = await Users.findByPk(req.user.id)

      if (!user) {
        res.status(400).json({ msg: "This user does not exist" })
        return next(new ErrorResponse("This user does not exist", 400))
      }

      const updatedSaved = (user.saved || []).filter(id => id !== req.params.id)
      await user.update({ saved: updatedSaved })

      res.status(200).json({ msg: 'unSaved Post!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getSavePosts: async (req, res) => {
    try {
      const currentUser = await Users.findByPk(req.user.id)
      const savedIds = currentUser.saved || []

      const features = new APIfeatures(Posts, req.query, {
        id: { [Op.in]: savedIds }
      }).paginating()

      const savePosts = await features.execute()

      res.status(200).json({
        savePosts,
        result: savePosts.length
      })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  }
}

module.exports = postCtrl
