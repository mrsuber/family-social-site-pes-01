const Conversations = require('../models/conversationModel')
const Messages = require('../models/messageModal')
const ErrorResponse = require('../utils/errorResponse')


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


const messageCtrl = {
  createMessage: async (req,res) => {
    try{
      const {sender,recipient, text, media,call } = req.body

      if(!recipient || (!text.trim() && media.length === 0 && !call)) return
      const newConversation = await Conversations.findOneAndUpdate({
        $or:[
          {recipients: [sender, recipient]},
          {recipients: [recipient, sender]},

        ]
      },{
        recipients:[sender,recipient],
        text, media, call
      },{new:true, upsert:true})

      const newMessage = new Messages({
        conversation : newConversation._id,
        sender, call,
        recipient, text, media
      })

      await newMessage.save()

      res.status(200).json({msg:'Create success'})
    }catch(err){
      return res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getConversations: async(req,res) =>{
    try{

      const features = new APIfeatures(Conversations.find(
        {
          recipients:req.user._id
        }
      ),req.query).paginating()
      const conversations = await features.query.sort('updatedAt')
      .populate('recipients', 'profilePic username fullname')

      res.status(200).json({

        conversations,
        result:conversations.length
      })

    }catch(err){
      return res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getMessages: async(req,res) =>{
    try{

      const features = new APIfeatures(Messages.find(
        {
          $or:[
            {sender: req.user._id, recipient: req.params.id},
            {sender: req.params.id, recipient: req.user._id},
          ]
        }
      ),req.query).paginating()

      const messages = await features.query.sort('-createdAt')


      res.status(200).json({

        messages,
        result:messages.length
      })

    }catch(err){
      return res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },

  deleteMessages: async(req,res) =>{
    try{

      await Messages.findOneAndDelete({_id:req.params.id, sender:req.user._id})

      res.status(200).json({msg:'Delete Success!'})

    }catch(err){
      return res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  deleteConversation: async(req,res) =>{
    try{

      const newConver = await Conversations.findOneAndDelete({
        $or:[
          {recipients: [req.user._id, req.params.id]},
          {recipients: [req.params.id, req.user._id]}
        ]
      })
      await Messages.deleteMany({conversation: newConver._id})

      res.status(200).json({msg:'Delete Success!'})

    }catch(err){
      return res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  }

}

module.exports = messageCtrl
