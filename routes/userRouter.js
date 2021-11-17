const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const userCtrl = require('../controllers/userCtrl')

router.get('/search', auth,userCtrl.searchUser)

router.get('/user/:id', auth,userCtrl.getUser)

router.patch('/user',auth,userCtrl.updateUser)

module.exports = router;
