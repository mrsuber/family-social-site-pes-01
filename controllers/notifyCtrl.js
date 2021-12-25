const Notifies = require('../models/notifyModel')
const ErrorResponse = require('../utils/errorResponse')

const notifyCtrl = {
    createNotify: async (req,res) =>{

      try{
        const { id, recipients, url, text, content, image } = req.body

        if(recipients.includes(req.user._id.toString())) return

        const notify = new Notifies({
          id, recipients, url, text, content, image, user:req.user._id
        })

        await notify.save()
        return res.status(200).json({notify})
      }catch(err){
        res.status(500).json({msg:err.message})
        return next(new ErrorResponse(err.message, 500))
      }
    },


    removeNotify: async (req,res) =>{

      try{
        const notify = await Notifies.findOneAndDelete({
          id:req.params.id, url:req.query.url
        })
        return res.status(200).json({notify})
      }catch(err){
        res.status(500).json({msg:err.message})
        return next(new ErrorResponse(err.message, 500))
      }
    },

    getNotifies:async (req,res) =>{

      try{
        const notifies = await Notifies.find({recipients:req.user._id})
        .sort('-createdAt').populate('user', 'profilePic username')

        return res.status(200).json({notifies})
      }catch(err){
        res.status(500).json({msg:err.message})
        return next(new ErrorResponse(err.message, 500))
      }
    },

    isReadNotify:async (req,res) =>{

      try{
        const notifies = await Notifies.findOneAndUpdate({_id:req.params.id}, {isRead:true})

        return res.status(200).json({notifies})
      }catch(err){
        res.status(500).json({msg:err.message})
        return next(new ErrorResponse(err.message, 500))
      }
    },

    deleteAllNotifies:async (req,res) =>{

      try{
        const notifies = await Notifies.deleteMany({recipients:req.user._id})

        return res.status(200).json({notifies})
      }catch(err){
        res.status(500).json({msg:err.message})
        return next(new ErrorResponse(err.message, 500))
      }
    },


}

module.exports = notifyCtrl
