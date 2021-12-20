const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const postCtrl = require('../controllers/postCtrl')

// router.route('/posts')
//   .post(auth,postCtrl.createPost)
//   .get(auth,postCtrl.getposts)
router.post('/posts',auth,postCtrl.createPost)
router.get('/posts',auth,postCtrl.getPosts)
router.get('/user_posts/:id',auth,postCtrl.getUserPosts)
router.patch('/posts/:id',auth,postCtrl.updatePost)
router.patch('/post/:id/like',auth,postCtrl.likePost)
router.patch('/post/:id/unlike',auth,postCtrl.unlikePost)
router.get('/post/:id',auth,postCtrl.getPost)
router.get('/post_discover',auth,postCtrl.getPostsDiscover)
router.delete('/post/:id',auth,postCtrl.deletePost)

router.patch('/savePost/:id',auth,postCtrl.savePost)
router.patch('/unSavePost/:id',auth,postCtrl.unSavePost)
router.get('/getSavePost',auth,postCtrl.getSavePosts)



module.exports = router
