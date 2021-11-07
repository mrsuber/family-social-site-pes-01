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
router.route("/private/updateuser/:id").put(protect,updateUser)
router.route("/private/finduser/:id").get(protect,findUser)
router.route("/private/getallusers").get(protect,getAllUsers)
router.route("/private/stats").get(protect,getUserStatistics)
router.route("/private/deleteuser/:id").delete(protect,deleteUser)


//movie routes
router.post('/private/createnewrecipe',upload.single('file'),protect,createNewRecipe)
router.route("/private/updaterecipe/:recipeId").put(protect,updateRecipe)
router.route("/private/deleterecipe/:recipeId").delete(protect,deleteRecipe)
router.route("/private/getarecipe/:recipeId").get(protect,getARecipe)
router.route("/private/getallrecipe").get(getAllRecipe)

router.route("/").get(protect,getPrivateData);

module.exports = router;
