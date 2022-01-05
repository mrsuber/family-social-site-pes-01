const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const messageCtrl = require('../controllers/messageCtrl')

router.post('/message',auth,messageCtrl.createMessage)
router.get('/conversations',auth,messageCtrl.getConversations)
router.get('/message/:id',auth,messageCtrl.getMessages)

module.exports = router
