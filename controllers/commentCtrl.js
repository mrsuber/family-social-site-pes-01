const { Op } = require('sequelize')
const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')
const ErrorResponse = require('../utils/errorResponse')

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body

      const post = await Posts.findByPk(postId)
      if (!post) {
        res.status(400).json({ msg: "This Post does not exist." })
        return next(new ErrorResponse("This Post does not exist.", 400))
      }

      if (reply) {
        const cm = await Comments.findByPk(reply)
        if (!cm) {
          res.status(400).json({ msg: "This comment does not exist." })
          return next(new ErrorResponse("This comment does not exist.", 400))
        }
      }

      const newComment = await Comments.create({
        userId: req.user.id,
        content,
        tag,
        reply,
        postUserId,
        postId
      })

      // Add comment to post's comments array
      const updatedComments = [...(post.comments || []), newComment.id]
      await post.update({ comments: updatedComments })

      res.json({ newComment })

    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  updateComment: async (req, res) => {
    try {
      const { content } = req.body

      await Comments.update(
        { content },
        {
          where: {
            id: req.params.id,
            userId: req.user.id
          }
        }
      )

      res.status(200).json({ msg: 'Update Success!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comments.findByPk(req.params.id)

      if (!comment) {
        res.status(400).json({ msg: "This comment does not exist" })
        return next(new ErrorResponse("This comment does not exist", 400))
      }

      if (comment.likes && comment.likes.includes(req.user.id)) {
        res.status(400).json({ msg: "You liked this comment." })
        return next(new ErrorResponse("You liked this comment", 400))
      }

      const updatedLikes = [...(comment.likes || []), req.user.id]
      await comment.update({ likes: updatedLikes })

      res.json({ msg: 'Liked Comment!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  unlikeComment: async (req, res) => {
    try {
      const comment = await Comments.findByPk(req.params.id)

      if (!comment) {
        res.status(400).json({ msg: "This comment does not exist" })
        return next(new ErrorResponse("This comment does not exist", 400))
      }

      const updatedLikes = (comment.likes || []).filter(id => id !== req.user.id)
      await comment.update({ likes: updatedLikes })

      res.json({ msg: 'UnLiked Comment!' })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findOne({
        where: {
          id: req.params.id,
          [Op.or]: [
            { userId: req.user.id },
            { postUserId: req.user.id }
          ]
        }
      })

      if (!comment) {
        res.status(400).json({ msg: "Comment not found or you don't have permission" })
        return next(new ErrorResponse("Comment not found or you don't have permission", 400))
      }

      // Remove comment from post
      const post = await Posts.findByPk(comment.postId)
      if (post) {
        const updatedComments = (post.comments || []).filter(id => id !== req.params.id)
        await post.update({ comments: updatedComments })
      }

      await comment.destroy()

      res.status(200).json({ msg: 'Deleted Comment!' })

    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  }
}

module.exports = commentCtrl
