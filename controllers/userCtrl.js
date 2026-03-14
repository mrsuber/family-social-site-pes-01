const { Op, fn, col, literal } = require('sequelize')
const Users = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const { sequelize } = require('../config/db')

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.findAll({
        where: {
          username: {
            [Op.iLike]: `%${req.query.username}%`
          }
        },
        attributes: ['id', 'fullname', 'username', 'profilePic'],
        limit: 10
      })
      res.json({ users })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      })

      if (!user) {
        res.status(400).json({ msg: "User does not exist" })
        return next(new ErrorResponse({ msg: "User does not exist" }, 400))
      }

      res.status(200).json({ user })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  updateUser: async (req, res) => {
    try {
      const { profilePic, fullname, mobile, address, story, website, gender } = req.body

      if (!fullname) {
        res.status(400).json({ msg: "Please add your full name" })
        return next(new ErrorResponse({ msg: "Please add your full name" }, 400))
      }

      await Users.update(
        { profilePic, fullname, mobile, address, story, website, gender },
        { where: { id: req.user.id } }
      )

      res.status(200).json({ msg: "Update Success!" })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  follow: async (req, res) => {
    try {
      const targetUser = await Users.findByPk(req.params.id)

      if (!targetUser) {
        res.status(400).json({ msg: "User does not exist" })
        return next(new ErrorResponse("User does not exist", 400))
      }

      // Check if already following
      if (targetUser.followers && targetUser.followers.includes(req.user.id)) {
        res.status(400).json({ msg: "You followed this user." })
        return next(new ErrorResponse("You followed this user", 400))
      }

      // Add follower to target user
      const updatedFollowers = [...(targetUser.followers || []), req.user.id]
      await targetUser.update({ followers: updatedFollowers })

      // Add following to current user
      const currentUser = await Users.findByPk(req.user.id)
      const updatedFollowing = [...(currentUser.following || []), req.params.id]
      await currentUser.update({ following: updatedFollowing })

      // Reload target user
      await targetUser.reload({ attributes: { exclude: ['password'] } })

      res.status(200).json({ newUser: targetUser })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  unfollow: async (req, res) => {
    try {
      const targetUser = await Users.findByPk(req.params.id)

      if (!targetUser) {
        res.status(400).json({ msg: "User does not exist" })
        return next(new ErrorResponse("User does not exist", 400))
      }

      // Remove follower from target user
      const updatedFollowers = (targetUser.followers || []).filter(id => id !== req.user.id)
      await targetUser.update({ followers: updatedFollowers })

      // Remove following from current user
      const currentUser = await Users.findByPk(req.user.id)
      const updatedFollowing = (currentUser.following || []).filter(id => id !== req.params.id)
      await currentUser.update({ following: updatedFollowing })

      // Reload target user
      await targetUser.reload({ attributes: { exclude: ['password'] } })

      res.status(200).json({ newUser: targetUser })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  suggestionsUser: async (req, res) => {
    try {
      const currentUser = await Users.findByPk(req.user.id)
      const excludeIds = [...(currentUser.following || []), req.user.id]
      const num = req.query.num || 10

      const users = await Users.findAll({
        where: {
          id: {
            [Op.notIn]: excludeIds
          }
        },
        attributes: { exclude: ['password'] },
        limit: Number(num),
        order: sequelize.random()
      })

      return res.status(200).json({
        users,
        result: users.length
      })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  }
}

module.exports = userCtrl
