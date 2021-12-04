const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const postCtrl = require('../controllers/postCtrl')

// router.route('/posts')
//   .post(auth,postCtrl.createPost)
//   .get(auth,postCtrl.getposts)
router.post('/posts',auth,postCtrl.createPost)
router.get('/posts',auth,postCtrl.getPosts)

module.exports = router
