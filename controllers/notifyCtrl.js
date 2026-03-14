const { Op } = require('sequelize')
const Notifies = require('../models/notifyModel')
const ErrorResponse = require('../utils/errorResponse')

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body

      if (recipients.includes(req.user.id.toString())) return

      const notify = await Notifies.create({
        id,
        recipients,
        url,
        text,
        content,
        image,
        userId: req.user.id
      })

      return res.status(200).json({ notify })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOne({
        where: {
          id: req.params.id,
          url: req.query.url
        }
      })

      if (notify) {
        await notify.destroy()
      }

      return res.status(200).json({ notify })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.findAll({
        where: {
          recipients: {
            [Op.contains]: [req.user.id]
          }
        },
        order: [['createdAt', 'DESC']]
      })

      return res.status(200).json({ notifies })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  isReadNotify: async (req, res) => {
    try {
      await Notifies.update(
        { isRead: true },
        { where: { id: req.params.id } }
      )

      const notifies = await Notifies.findByPk(req.params.id)

      return res.status(200).json({ notifies })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  },

  deleteAllNotifies: async (req, res) => {
    try {
      const result = await Notifies.destroy({
        where: {
          recipients: {
            [Op.contains]: [req.user.id]
          }
        }
      })

      return res.status(200).json({ notifies: result })
    } catch (err) {
      res.status(500).json({ msg: err.message })
      return next(new ErrorResponse(err.message, 500))
    }
  }
}

module.exports = notifyCtrl
