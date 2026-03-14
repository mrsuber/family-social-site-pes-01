const router = require('express').Router();
const generalCtrl = require('../controllers/generalCtrl');
const personCtrl = require('../controllers/personCtrl');
const assetCtrl = require('../controllers/assetCtrl');
const loanCtrl = require('../controllers/loanCtrl');
const sickLeaveCtrl = require('../controllers/sickLeaveCtrl');
const skillCtrl = require('../controllers/skillCtrl');
const projectCtrl = require('../controllers/projectCtrl');
const analyticsCtrl = require('../controllers/analyticsCtrl');
const departmentCtrl = require('../controllers/departmentCtrl');
const calendarCtrl = require('../controllers/calendarCtrl');
const diaryCtrl = require('../controllers/diaryCtrl');
const uploadCtrl = require('../controllers/uploadCtrl');
const missionControlCtrl = require('../controllers/missionControlCtrl');
const { upload } = require('../middleware/upload');

// ==================== ANALYTICS ROUTES ====================
// Dashboard and overview analytics
router.get('/analytics/dashboard', analyticsCtrl.getDashboardStats);
router.get('/analytics/general/:generalId', analyticsCtrl.getGeneralOverview);
router.get('/analytics/resources', analyticsCtrl.getResourceAllocation);
router.get('/analytics/financial', analyticsCtrl.getFinancialOverview);
router.get('/analytics/performance', analyticsCtrl.getPeoplePerformance);
router.get('/analytics/alerts', analyticsCtrl.getAlerts);

// ==================== GENERAL ROUTES ====================
// Strategic generals management
router.get('/generals', generalCtrl.getAllGenerals);
router.get('/generals/:id', generalCtrl.getGeneral);
router.post('/generals', generalCtrl.createGeneral);
router.put('/generals/:id', generalCtrl.updateGeneral);
router.delete('/generals/:id', generalCtrl.deleteGeneral);
router.put('/generals/:id/commander', generalCtrl.assignCommander);

// ==================== PEOPLE ROUTES ====================
// People/resource management
router.get('/people', personCtrl.getAllPeople);
router.get('/people/relationship/:relationshipType', personCtrl.getPeopleByRelationship);
router.get('/people/general/:generalId', personCtrl.getPeopleByGeneral);
router.get('/people/:id', personCtrl.getPerson);
router.post('/people', personCtrl.createPerson);
router.put('/people/:id', personCtrl.updatePerson);
router.delete('/people/:id', personCtrl.deletePerson);

// People - Skills management
router.post('/people/:id/skills', personCtrl.addSkill);
router.put('/people/:id/skills/:skillId', personCtrl.updateSkill);

// People - Experience management
router.post('/people/:id/experiences', personCtrl.addExperience);

// People - Education management
router.post('/people/:id/education', personCtrl.addEducation);

// People - Language management
router.post('/people/:id/languages', personCtrl.addLanguage);

// ==================== SKILLS ROUTES ====================
// Skills catalog management
router.get('/skills', skillCtrl.getAllSkills);
router.get('/skills/category/:category', skillCtrl.getSkillsByCategory);
router.get('/skills/:id', skillCtrl.getSkill);
router.post('/skills', skillCtrl.createSkill);
router.put('/skills/:id', skillCtrl.updateSkill);
router.delete('/skills/:id', skillCtrl.deleteSkill);

// ==================== ASSETS ROUTES ====================
// Physical assets tracking
router.get('/assets', assetCtrl.getAllAssets);
router.get('/assets/maintenance', assetCtrl.getMaintenanceNeeded);
router.get('/assets/:id', assetCtrl.getAsset);
router.post('/assets', assetCtrl.createAsset);
router.put('/assets/:id', assetCtrl.updateAsset);
router.delete('/assets/:id', assetCtrl.deleteAsset);
router.put('/assets/:id/assign', assetCtrl.assignAsset);
router.put('/assets/:id/unassign', assetCtrl.unassignAsset);

// ==================== LOANS ROUTES ====================
// Company loans tracking
router.get('/loans', loanCtrl.getAllLoans);
router.get('/loans/summary', loanCtrl.getActiveLoansSummary);
router.get('/loans/:id', loanCtrl.getLoan);
router.post('/loans', loanCtrl.createLoan);
router.put('/loans/:id', loanCtrl.updateLoan);
router.delete('/loans/:id', loanCtrl.deleteLoan);
router.post('/loans/:id/payment', loanCtrl.recordPayment);

// ==================== SICK LEAVE ROUTES ====================
// Sick leave management
router.get('/sick-leaves', sickLeaveCtrl.getAllSickLeaves);
router.get('/sick-leaves/active', sickLeaveCtrl.getActiveSickLeaves);
router.get('/sick-leaves/count', sickLeaveCtrl.getSickLeaveCount);
router.get('/sick-leaves/:id', sickLeaveCtrl.getSickLeave);
router.post('/sick-leaves', sickLeaveCtrl.createSickLeave);
router.put('/sick-leaves/:id', sickLeaveCtrl.updateSickLeave);
router.delete('/sick-leaves/:id', sickLeaveCtrl.deleteSickLeave);

// ==================== PROJECTS ROUTES ====================
// Project management
router.get('/projects', projectCtrl.getAllProjects);
router.get('/projects/general/:generalId', projectCtrl.getProjectsByGeneral);
router.get('/projects/:id', projectCtrl.getProject);
router.post('/projects', projectCtrl.createProject);
router.put('/projects/:id', projectCtrl.updateProject);
router.delete('/projects/:id', projectCtrl.deleteProject);

// Project assignments
router.post('/projects/:id/assign', projectCtrl.assignPerson);
router.delete('/projects/:id/people/:personId', projectCtrl.removePerson);

// ==================== DEPARTMENTS ROUTES ====================
// Department management
router.get('/departments', departmentCtrl.getAllDepartments);
router.get('/departments/project/:projectId', departmentCtrl.getDepartmentsByProject);
router.get('/departments/:id', departmentCtrl.getDepartment);
router.post('/departments', departmentCtrl.createDepartment);
router.put('/departments/:id', departmentCtrl.updateDepartment);
router.delete('/departments/:id', departmentCtrl.deleteDepartment);

// ==================== CALENDAR ROUTES ====================
// Commander calendar management
router.get('/calendar', calendarCtrl.getCalendarEvents);
router.get('/calendar/person/:personId', calendarCtrl.getPersonEvents);
router.get('/calendar/:id', calendarCtrl.getCalendarEvent);
router.post('/calendar', calendarCtrl.createCalendarEvent);
router.put('/calendar/:id', calendarCtrl.updateCalendarEvent);
router.delete('/calendar/:id', calendarCtrl.deleteCalendarEvent);
router.put('/calendar/:id/status', calendarCtrl.updateEventStatus);

// ==================== DIARY ROUTES ====================
// Commander diary management
router.get('/diary', diaryCtrl.getDiaryEntries);
router.get('/diary/person/:personId', diaryCtrl.getPersonEntries);
router.get('/diary/person/:personId/date/:date', diaryCtrl.getEntryByDate);
router.get('/diary/:id', diaryCtrl.getDiaryEntry);
router.post('/diary', diaryCtrl.createDiaryEntry);
router.put('/diary/:id', diaryCtrl.updateDiaryEntry);
router.delete('/diary/:id', diaryCtrl.deleteDiaryEntry);

// ==================== UPLOAD ROUTES ====================
// File upload management
router.post('/upload/profile-photo', upload.single('photo'), uploadCtrl.uploadProfilePhoto);
router.post('/upload/gallery-photo', upload.single('photo'), uploadCtrl.uploadGalleryPhoto);
router.delete('/upload/gallery-photo', uploadCtrl.deleteGalleryPhoto);
router.post('/upload/document', upload.single('document'), uploadCtrl.uploadDocument);
router.delete('/upload/document', uploadCtrl.deleteDocument);
router.post('/upload/diary-audio', upload.single('audio'), uploadCtrl.uploadDiaryAudio);
router.delete('/upload/diary-audio', uploadCtrl.deleteDiaryAudio);

// ==================== MISSION CONTROL ROUTES ====================
// Mission control canvas node positions
router.get('/mission-control/positions', missionControlCtrl.getNodePositions);
router.post('/mission-control/positions', missionControlCtrl.saveNodePositions);
router.delete('/mission-control/positions', missionControlCtrl.resetNodePositions);

module.exports = router;
