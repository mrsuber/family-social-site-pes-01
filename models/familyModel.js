const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
  familyMember:{type: mongoose.Types.ObjectId, ref:'user' },
  familyName:Array
},{timestamps:true})

module.exports = mongoose.model('family', familySchema)
