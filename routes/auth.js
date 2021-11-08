const express=require('express');
const router = express.Router();
const { protect } = require('../middleware/auth')

const {register,login,forgotpassword,resetpassword,logout,generateAccessToken} = require('../controllers/auth')

router.route("/auth/register").post(register)

router.route("/auth/login").post(login)

router.route("/auth/logout").post(logout)

router.route("/auth/refresh_token").post(generateAccessToken)

router.route("/auth/forgotpassword").post(forgotpassword)

router.route("/auth/resetpassword/:resetToken").put(resetpassword)


module.exports = router;
