
const mongoose = require('mongoose')

const StatisticsSchema = new mongoose.Schema({

},
{timestamps:true})



const User = mongoose.model("statistics",StatisticsSchema);

module.exports=User;
