const router = require('express').Router();
const empireCommandCtrl = require('../controllers/empireCommandCtrl');
const { auth } = require('../middleware/auth');

// Get Empire Command data for current user
router.get('/empire-command', auth, empireCommandCtrl.getEmpireCommand);

// Update Empire Command data
router.put('/empire-command', auth, empireCommandCtrl.updateEmpireCommand);

// Time Allocation
router.put('/empire-command/time-allocation', auth, empireCommandCtrl.updateTimeAllocation);
router.put('/empire-command/time-allocation/auto-adjust', auth, empireCommandCtrl.autoAdjustTime);

// Expenses
router.post('/empire-command/expense', auth, empireCommandCtrl.addExpense);
router.put('/empire-command/expense', auth, empireCommandCtrl.updateExpense);
router.delete('/empire-command/expense', auth, empireCommandCtrl.deleteExpense);

// Income
router.put('/empire-command/income', auth, empireCommandCtrl.updateIncome);

// Update project priority (move between lanes)
router.put('/empire-command/project-priority', auth, empireCommandCtrl.updateProjectPriority);

// Update settings
router.put('/empire-command/settings', auth, empireCommandCtrl.updateSettings);

module.exports = router;
