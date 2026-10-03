const router = require('express').Router();
const empireCommandCtrl = require('../controllers/empireCommandCtrl');
const { auth } = require('../middleware/auth');

// Get Empire Command data for current user
router.get('/empire-command', auth, empireCommandCtrl.getEmpireCommand);

// Update Empire Command data
router.put('/empire-command', auth, empireCommandCtrl.updateEmpireCommand);

// Update time allocation
router.put('/empire-command/time-allocation', auth, empireCommandCtrl.updateTimeAllocation);

// Add expense
router.post('/empire-command/expense', auth, empireCommandCtrl.addExpense);

// Update project priority (move between lanes)
router.put('/empire-command/project-priority', auth, empireCommandCtrl.updateProjectPriority);

// Update settings
router.put('/empire-command/settings', auth, empireCommandCtrl.updateSettings);

module.exports = router;
