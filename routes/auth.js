const express=require('express');
const router = express.Router();

const {register,login,forgotpassword,resetpassword,logout,generateFreshToken} = require('../controllers/auth')

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").post(logout)

router.route("/refresh_token").post(generateFreshToken)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)


module.exports = router;
