const router = require('express').Router();
const islamicCourseCtrl = require('../controllers/islamicCourseCtrl');
const { auth } = require('../middleware/auth');

// ==================== COURSE MODULES ROUTES ====================
// Get all modules for a specific department
router.get('/islamic-courses/department/:departmentId/modules', islamicCourseCtrl.getModulesByDepartment);

// Get single module with all lessons, resources, and assignments
router.get('/islamic-courses/module/:moduleId', islamicCourseCtrl.getModuleById);

// Create new course module (admin only)
router.post('/islamic-courses/modules', auth, islamicCourseCtrl.createModule);

// Update course module (admin only)
router.put('/islamic-courses/modules/:moduleId', auth, islamicCourseCtrl.updateModule);

// Delete course module (admin only)
router.delete('/islamic-courses/modules/:moduleId', auth, islamicCourseCtrl.deleteModule);

// ==================== LESSONS ROUTES ====================
// Get all lessons for a module
router.get('/islamic-courses/module/:moduleId/lessons', islamicCourseCtrl.getLessonsByModule);

// Get single lesson by ID
router.get('/islamic-courses/lessons/:lessonId', islamicCourseCtrl.getLessonById);

// Create new lesson (admin only)
router.post('/islamic-courses/lessons', auth, islamicCourseCtrl.createLesson);

// Update lesson (admin only)
router.put('/islamic-courses/lessons/:lessonId', auth, islamicCourseCtrl.updateLesson);

// Delete lesson (admin only)
router.delete('/islamic-courses/lessons/:lessonId', auth, islamicCourseCtrl.deleteLesson);

// ==================== RESOURCES ROUTES ====================
// Create new resource (admin only)
router.post('/islamic-courses/resources', auth, islamicCourseCtrl.createResource);

// Update resource (admin only)
router.put('/islamic-courses/resources/:resourceId', auth, islamicCourseCtrl.updateResource);

// Delete resource (admin only)
router.delete('/islamic-courses/resources/:resourceId', auth, islamicCourseCtrl.deleteResource);

// ==================== ASSIGNMENTS ROUTES ====================
// Create new assignment (admin only)
router.post('/islamic-courses/assignments', auth, islamicCourseCtrl.createAssignment);

// Update assignment (admin only)
router.put('/islamic-courses/assignments/:assignmentId', auth, islamicCourseCtrl.updateAssignment);

// Delete assignment (admin only)
router.delete('/islamic-courses/assignments/:assignmentId', auth, islamicCourseCtrl.deleteAssignment);

// ==================== USER PROGRESS ROUTES ====================
// Get user's overall progress (requires auth)
router.get('/islamic-courses/progress', auth, islamicCourseCtrl.getUserProgress);

// Get user progress for specific module (requires auth)
router.get('/islamic-courses/progress/module/:moduleId', auth, islamicCourseCtrl.getUserProgressByModule);

// Create or update user progress (requires auth)
router.post('/islamic-courses/progress', auth, islamicCourseCtrl.updateProgress);

module.exports = router;
