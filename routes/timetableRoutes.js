const router = require('express').Router();
const timetableCtrl = require('../controllers/timetableCtrl');
const auth = require('../middleware/auth');

// Get timetable for specific person and date
router.get('/timetable/:personId/:date', auth, timetableCtrl.getTimetable);

// Get week view
router.get('/timetable/:personId/week/:startDate', auth, timetableCtrl.getWeekTimetables);

// Create new timetable
router.post('/timetable', auth, timetableCtrl.createTimetable);

// Update timetable (daily log)
router.put('/timetable/:id', auth, timetableCtrl.updateTimetable);

// Update specific time block
router.put('/timetable/:id/block/:blockId', auth, timetableCtrl.updateTimeBlock);

// Delete timetable
router.delete('/timetable/:id', auth, timetableCtrl.deleteTimetable);

module.exports = router;
