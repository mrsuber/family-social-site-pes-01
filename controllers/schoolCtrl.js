const School = require('../models/schoolModel')
const ErrorResponse = require('../utils/errorResponse')



const schoolCtrl = {
  createSchool: async (req,res) => {
    try{
      const {
        name,
        learningTitle,
        logo,
        path,
        about,
        MainLocation,
        TotalNumberOfBranches,
        courseLink
      } = req.body
      const school = await School.create({
        name,
        learningTitle,
        logo,
        path,
        about,
        MainLocation,
        TotalNumberOfBranches,
        courseLink
      })
      res.status(200).json({msg:"success",school})

    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }
  },
  getSchools:async (req,res) => {
    try{
      const schools = await School.find()
      res.status(201).json({msg:"Success",schools})
    }catch(err){
      res.status(500).json({msg:err.message})
      return next(new ErrorResponse(err.message, 500))
    }

  }
}

module.exports = schoolCtrl
