const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const commentCtrl = require('../controllers/commentCtrl')

router.post('/comment',auth,commentCtrl.createComment)


module.exports = router
