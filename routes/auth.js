const express=require('express');
const router = express.Router();

const {register,login,forgotpassword,resetpassword,logout,generateFreshToken} = require('../controllers/auth')

router.route("/auth/register").post(register)

router.route("/auth/login").post(login)

router.route("/auth/logout").post(logout)

router.route("/auth/refresh_token").post(generateFreshToken)

router.route("/auth/forgotpassword").post(forgotpassword)

router.route("/auth/resetpassword/:resetToken").put(resetpassword)


module.exports = router;
