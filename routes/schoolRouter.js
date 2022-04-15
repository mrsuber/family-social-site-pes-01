const express=require('express');
const router = express.Router();
const schoolCtrl = require('../controllers/schoolCtrl')

router.post('/school',schoolCtrl.createSchool)
router.get('/school',schoolCtrl.getSchools)

module.exports = router
