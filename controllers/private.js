const User = require('../models/User')
const Recipe=require('../models/Recipe')

const bcrypt = require('bcryptjs')
const ErrorResponse = require('../utils/errorResponse')
var ObjectId = require('mongoose').Types.ObjectId;

// filesize fileSizeFormatter
const fileSizeFormatter= (bytes,decimal) =>{
  if(bytes===0){
    return '0 Bytes'
  }
  const dm = decimal || 2
  const sizes = ['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB']
  const index= Math.floor(Math.log(bytes)/Math.log(1000));
  return parseFloat((bytes / Math.pow(1000,index)).toFixed(dm)) + ' ' + sizes[index];
}

//update user

exports.updateUser= async (req,res,next)=>{

  if(req.body.password){
    const salt =await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
  }

  if(req.body.isAdmin && !req.user.isAdmin){
    return next(new ErrorResponse("Only Admin has privilage", 400))
  }


  //now we are working with database
  try{
    const user= await User.findByIdAndUpdate((req.params.id),{ $set:req.body },{new:true})
    res.status(201).json({success:true,data:"User update successfull"})

  }catch(error){
    next(error)

  }
}

//delet user

exports.deleteUser= async (req,res,next)=>{
  //now we are working with database
  try{
     await User.findByIdAndDelete(req.params.id)
    res.status(201).json({success:true,data:"User has been deleted ...."})

  }catch(error){
    next(error)

  }
}

//find user
exports.findUser= async (req,res,next)=>{
  //now we are working with database
  try{
     const user = await User.findById(req.params.id)
    res.status(201).json({success:true,data:user})

  }catch(error){
    next(error)

  }
}

//find all users
exports.getAllUsers= async (req,res,next)=>{
  const query = req.query.new;
  //now we are working with database
  try{
     const users = query? await User.find().sort({_id:-1}).limit(10) : await User.find()
    res.status(201).json({success:true,data:users})

  }catch(error){
    next(error)

  }
}

//find all users statistics
exports.getUserStatistics= async (req,res,next)=>{
  const today = new Date()
  const lastYear = today.setFullYear(today.setFullYear() - 1)

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //now we are working with database
  try{
    const data = await User.aggregate([
      {
        $project:{
          month:{$month:"$createdAt"}
        }
      },{
        $group:{
           _id:"$month",
           total: {$sum:1}
        }
      }
    ])

    res.status(200).json(data)
  }catch(error){
    next(error)

  }
}


//management of Recipes
//create Recipe
exports.createNewRecipe = async (req,res,next) =>{

  try{
    const recipe = new Recipe({
      name:req.body.name,
      category:req.body.category,
      price:req.body.price,
      desc:req.body.desc,
      fileName:req.file.originalname,
      filePath:req.file.path,
      fileType:req.file.mimetype,
      fileSize:fileSizeFormatter(req.file.size,2) //0.00



    });
    // await Recipe.save();
    // const newRecipe = await Recipe.create(req.body)
    const saveRecipe = await recipe.save()
    res.status(200).json({success:true, data:saveRecipe})
  }catch(error){next(error)}

}

//updateRecipe
exports.updateRecipe = async (req,res,next) =>{
  try{
    const updateRecipe = await Recipe.findByIdAndUpdate({_id:(req.params.recipeId)},{$set:req.body},{new:true})
    res.status(200).json({success:true,updateRecipe})
  }catch(error){next(error)}

}

//delet pordject
exports.deleteRecipe = async (req,res,next) =>{
  try{
  await Recipe.findByIdAndDelete((req.params.recipeId))
    res.status(200).json({success:true,data:"Recipe deleted"})
  }catch(error){next(error)}

}

//get a Recipe
exports.getARecipe = async (req,res,next) =>{
  try{
  const recipe = await Recipe.findById({ _id: ObjectId(req.params.recipeId)})

    res.status(200).json({success:true,data:recipe})
  }catch(error){next(error)}

}

//get all Recipe
exports.getAllRecipe = async (req,res,next) =>{
  try{
  const recipe = await Recipe.find()
    res.status(200).json({success:true,data:recipe.reverse()})
  }catch(error){next(error)}

}








exports.getPrivateData = (req,res,next) =>{
  res.status(200).json(
    {
      sucess:true,
      data:"You got access to the private data in this route",

    }
  )
}
