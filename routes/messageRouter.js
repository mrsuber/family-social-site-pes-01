const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const messageCtrl = require('../controllers/messageCtrl')

router.post('/message',auth,messageCtrl.createMessage)
router.get('/conversations',auth,messageCtrl.getConversations)
router.get('/message/:id',auth,messageCtrl.getMessages)
router.delete('/message/:id',auth,messageCtrl.deleteMessages)
router.delete('/conversation/:id',auth,messageCtrl.deleteConversation)

module.exports = router