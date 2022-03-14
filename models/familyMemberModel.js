const mongoose = require('mongoose')

const familyMemberSchema = new mongoose.Schema({
  familyName:{
    type:String,
    required:true
  },
  familyHead:{
    type:String,
    required:true
  },
  familyMember:{type: mongoose.Types.ObjectId,ref:'user'}
},{timestamps:true})

module.exports = mongoose.model('familyMember', familyMemberSchema)
