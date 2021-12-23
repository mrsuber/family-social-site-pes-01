const Notifies = require('../models/notifyModel')
const ErrorResponse = require('../utils/errorResponse')

const notifyCtrl = {
    createNotify: async (req,res) =>{

      try{
        const { id, recipients, url, text, content, image } = req.body

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
        .sort('isRead').populate('user', 'profilePic username')

        return res.status(200).json({notifies})
      }catch(err){
        res.status(500).json({msg:err.message})
        return next(new ErrorResponse(err.message, 500))
      }
    },


}

module.exports = notifyCtrl
