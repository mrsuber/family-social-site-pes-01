const express = require("express");
const router = express.Router();
const {
  getPrivateData,
  updateUser,
  findUser,
  getAllUsers,
  deleteUser,
  getUserStatistics,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
  getARecipe,
  getAllRecipe,
  getRandomRecipe

} = require('../controllers/private')
const { protect } = require('../middleware/auth')
const {upload} = require('../helpers/filehelper')

//manupulate user data
router.route("/updateuser/:id").put(protect,updateUser)
router.route("/finduser/:id").get(protect,findUser)
router.route("/getallusers").get(protect,getAllUsers)
router.route("/stats").get(protect,getUserStatistics)
router.route("/deleteuser/:id").delete(protect,deleteUser)


//movie routes
router.post('/createnewrecipe',upload.single('file'),protect,createNewRecipe)
router.route("/updaterecipe/:recipeId").put(protect,updateRecipe)
router.route("/deleterecipe/:recipeId").delete(protect,deleteRecipe)
router.route("/getarecipe/:recipeId").get(protect,getARecipe)
router.route("/getallrecipe").get(getAllRecipe)

router.route("/").get(protect,getPrivateData);

module.exports = router;
