const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const userCtrl = require('../controllers/userCtrl')

router.get('/search', auth,userCtrl.searchUser)

module.exports = router;
