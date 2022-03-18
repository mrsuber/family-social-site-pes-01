const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const welcomeCtrl = require('../controllers/welcomeCtrl')

router.get('/welcomeUser', welcomeCtrl.welcomeMsg)


module.exports = router;
