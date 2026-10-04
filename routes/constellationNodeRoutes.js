const router = require('express').Router();
const constellationNodeCtrl = require('../controllers/constellationNodeCtrl');
const { auth } = require('../middleware/auth');

router.get('/constellation-nodes', auth, constellationNodeCtrl.getNodes);
router.post('/constellation-nodes', auth, constellationNodeCtrl.createNode);
router.put('/constellation-nodes/:id', auth, constellationNodeCtrl.updateNode);
router.delete('/constellation-nodes/:id', auth, constellationNodeCtrl.deleteNode);

module.exports = router;
