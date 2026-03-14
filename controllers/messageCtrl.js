const { Op } = require('sequelize')
const Conversations = require('../models/conversationModel')
const Messages = require('../models/messageModal')
const ErrorResponse = require('../utils/errorResponse')

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

  async execute(order = [['createdAt', 'DESC']]) {
    return await this.model.findAll({
      where: this.whereClause,
      limit: this.limit,
      offset: this.offset,
      order
    });
  }
}

const messageCtrl = {
  createMessage: async (req, res) => {
    try {
      const { sender, recipient, text, media, call } = req.body

      if (!recipient || (!text.trim() && media.length === 0 && !call)) return

      // Find or create conversation
      let conversation = await Conversations.findOne({
        where: {
          [Op.or]: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] }
          ]
        }
      })

      if (conversation) {
        await conversation.update({ text, media, call })
      } else {
        conversation = await Conversations.create({
          recipients: [sender, recipient],
          text,
          media,
          call
        })
      }

      const newMessage = await Messages.create({
        conversationId: conversation.id,
        senderId: sender,
        recipientId: recipient,
        text,
        media,
        call
      })

      res.status(200).json({ msg: 'Create success' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getConversations: async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversations,
        req.query,
        {
          recipients: {
            [Op.contains]: [req.user.id]
          }
        }
      ).paginating()

      const conversations = await features.execute([['updatedAt', 'ASC']])

      res.status(200).json({
        conversations,
        result: conversations.length
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getMessages: async (req, res) => {
    try {
      const features = new APIfeatures(
        Messages,
        req.query,
        {
          [Op.or]: [
            { senderId: req.user.id, recipientId: req.params.id },
            { senderId: req.params.id, recipientId: req.user.id }
          ]
        }
      ).paginating()

      const messages = await features.execute([['createdAt', 'DESC']])

      res.status(200).json({
        messages,
        result: messages.length
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  deleteMessages: async (req, res) => {
    try {
      await Messages.destroy({
        where: {
          id: req.params.id,
          senderId: req.user.id
        }
      })

      res.status(200).json({ msg: 'Delete Success!' })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  deleteConversation: async (req, res) => {
    try {
      const conversation = await Conversations.findOne({
        where: {
          [Op.or]: [
            { recipients: [req.user.id, req.params.id] },
            { recipients: [req.params.id, req.user.id] }
          ]
        }
      })

      if (conversation) {
        await Messages.destroy({ where: { conversationId: conversation.id } })
        await conversation.destroy()
      }

      res.status(200).json({ msg: 'Delete Success!' })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = messageCtrl
