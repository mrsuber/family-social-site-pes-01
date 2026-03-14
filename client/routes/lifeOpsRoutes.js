const router = require('express').Router();
const lifeOpsCtrl = require('../controllers/lifeOpsCtrl');
const auth = require('../middleware/auth');

// Income Streams
router.get('/income/:personId', auth, lifeOpsCtrl.getIncomeStreams);
router.post('/income', auth, lifeOpsCtrl.createIncomeStream);
router.put('/income/:id', auth, lifeOpsCtrl.updateIncomeStream);
router.delete('/income/:id', auth, lifeOpsCtrl.deleteIncomeStream);

// Expenses
router.get('/expenses/:personId', auth, lifeOpsCtrl.getExpenses);
router.post('/expenses', auth, lifeOpsCtrl.createExpense);
router.put('/expenses/:id', auth, lifeOpsCtrl.updateExpense);
router.delete('/expenses/:id', auth, lifeOpsCtrl.deleteExpense);

// Financial Dashboard (Runway Calculator)
router.get('/financial-dashboard/:personId', auth, lifeOpsCtrl.getFinancialDashboard);

// Time Blocks
router.get('/time-blocks/:personId', auth, lifeOpsCtrl.getTimeBlocks);
router.post('/time-blocks', auth, lifeOpsCtrl.createTimeBlock);
router.put('/time-blocks/:id', auth, lifeOpsCtrl.updateTimeBlock);
router.delete('/time-blocks/:id', auth, lifeOpsCtrl.deleteTimeBlock);

// Learning Investments
router.get('/learning/:personId', auth, lifeOpsCtrl.getLearningInvestments);
router.post('/learning', auth, lifeOpsCtrl.createLearningInvestment);
router.put('/learning/:id', auth, lifeOpsCtrl.updateLearningInvestment);
router.delete('/learning/:id', auth, lifeOpsCtrl.deleteLearningInvestment);

// Daily Logs
router.get('/daily-logs/:personId', auth, lifeOpsCtrl.getDailyLogs);
router.post('/daily-logs', auth, lifeOpsCtrl.upsertDailyLog);
router.delete('/daily-logs/:id', auth, lifeOpsCtrl.deleteDailyLog);

// Weekly Plans
router.get('/weekly-plans/:personId', auth, lifeOpsCtrl.getWeeklyPlans);
router.post('/weekly-plans', auth, lifeOpsCtrl.createWeeklyPlan);
router.put('/weekly-plans/:id', auth, lifeOpsCtrl.updateWeeklyPlan);
router.delete('/weekly-plans/:id', auth, lifeOpsCtrl.deleteWeeklyPlan);

module.exports = router;
