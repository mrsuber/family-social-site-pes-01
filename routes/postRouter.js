const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const postCtrl = require('../controllers/postCtrl')

// router.route('/posts')
//   .post(auth,postCtrl.createPost)
router.post('/posts',auth,postCtrl.createPost)

module.exports = router
