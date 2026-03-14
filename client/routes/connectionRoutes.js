const router = require('express').Router();
const connectionCtrl = require('../controllers/connectionCtrl');
const auth = require('../middleware/auth');

// Connections (Personal CRM)
router.get('/connections/:personId', auth, connectionCtrl.getConnections);
router.post('/connections', auth, connectionCtrl.createConnection);
router.put('/connections/:id', auth, connectionCtrl.updateConnection);
router.delete('/connections/:id', auth, connectionCtrl.deleteConnection);

// Conversations
router.get('/conversations/:connectionId', auth, connectionCtrl.getConversations);
router.post('/conversations', auth, connectionCtrl.createConversation);
router.put('/conversations/:id', auth, connectionCtrl.updateConversation);
router.delete('/conversations/:id', auth, connectionCtrl.deleteConversation);

// Gifts
router.get('/gifts/:connectionId', auth, connectionCtrl.getGifts);
router.post('/gifts', auth, connectionCtrl.createGift);
router.put('/gifts/:id', auth, connectionCtrl.updateGift);
router.delete('/gifts/:id', auth, connectionCtrl.deleteGift);

module.exports = router;
