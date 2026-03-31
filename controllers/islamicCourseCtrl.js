const IslamicCourseModule = require('../models/IslamicCourseModule');
const IslamicLesson = require('../models/IslamicLesson');
const IslamicResource = require('../models/IslamicResource');
const IslamicAssignment = require('../models/IslamicAssignment');
const UserCourseProgress = require('../models/UserCourseProgress');
const Department = require('../models/Department');

const islamicCourseCtrl = {
  // ==================== COURSE MODULES ====================

  // Get all modules for a department
  getModulesByDepartment: async (req, res) => {
    try {
      const { departmentId } = req.params;

      const modules = await IslamicCourseModule.findAll({
        where: { departmentId },
        order: [['orderNumber', 'ASC']],
        attributes: ['id', 'objectiveTitle', 'description', 'status', 'estimatedHours', 'orderNumber']
      });

      res.json({
        success: true,
        modules
      });
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch course modules',
        error: error.message
      });
    }
  },

  // Get single module with all lessons, resources, and assignments
  getModuleById: async (req, res) => {
    try {
      const { moduleId } = req.params;
      const userId = req.user?.id;

      // Fetch module
      const module = await IslamicCourseModule.findByPk(moduleId, {
        include: [
          {
            model: Department,
            as: 'department',
            attributes: ['id', 'name', 'description']
          }
        ]
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      // Fetch lessons with resources and assignments
      const lessons = await IslamicLesson.findAll({
        where: { moduleId },
        order: [['orderNumber', 'ASC']],
        include: [
          {
            model: IslamicResource,
            as: 'resources',
            required: false,
            order: [['orderNumber', 'ASC']]
          },
          {
            model: IslamicAssignment,
            as: 'assignments',
            required: false,
            order: [['orderNumber', 'ASC']]
          }
        ]
      });

      // Fetch user progress if user is authenticated
      let progress = null;
      if (userId) {
        progress = await UserCourseProgress.findAll({
          where: {
            userId,
            moduleId
          }
        });
      }

      res.json({
        success: true,
        module,
        lessons,
        progress
      });
    } catch (error) {
      console.error('Error fetching module:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch module details',
        error: error.message
      });
    }
  },

  // Create new course module
  createModule: async (req, res) => {
    try {
      const { departmentId, objectiveTitle, description, status, estimatedHours, orderNumber } = req.body;

      const module = await IslamicCourseModule.create({
        departmentId,
        objectiveTitle,
        description,
        status: status || 'draft',
        estimatedHours,
        orderNumber: orderNumber || 0
      });

      res.json({
        success: true,
        message: 'Module created successfully',
        module
      });
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create module',
        error: error.message
      });
    }
  },

  // Update course module
  updateModule: async (req, res) => {
    try {
      const { moduleId } = req.params;
      const updates = req.body;

      const module = await IslamicCourseModule.findByPk(moduleId);
      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      await module.update(updates);

      res.json({
        success: true,
        message: 'Module updated successfully',
        module
      });
    } catch (error) {
      console.error('Error updating module:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update module',
        error: error.message
      });
    }
  },

  // Delete course module
  deleteModule: async (req, res) => {
    try {
      const { moduleId } = req.params;

      const module = await IslamicCourseModule.findByPk(moduleId);
      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      await module.destroy();

      res.json({
        success: true,
        message: 'Module deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting module:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete module',
        error: error.message
      });
    }
  },

  // ==================== LESSONS ====================

  // Get all lessons for a module
  getLessonsByModule: async (req, res) => {
    try {
      const { moduleId } = req.params;

      const lessons = await IslamicLesson.findAll({
        where: { moduleId },
        order: [['orderNumber', 'ASC']],
        include: [
          {
            model: IslamicResource,
            as: 'resources',
            required: false,
            order: [['orderNumber', 'ASC']]
          },
          {
            model: IslamicAssignment,
            as: 'assignments',
            required: false,
            order: [['orderNumber', 'ASC']]
          }
        ]
      });

      res.json({
        success: true,
        lessons
      });
    } catch (error) {
      console.error('Error fetching lessons:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch lessons',
        error: error.message
      });
    }
  },

  // Get single lesson by ID
  getLessonById: async (req, res) => {
    try {
      const { lessonId } = req.params;

      const lesson = await IslamicLesson.findByPk(lessonId, {
        include: [
          {
            model: IslamicResource,
            as: 'resources',
            required: false,
            order: [['orderNumber', 'ASC']]
          },
          {
            model: IslamicAssignment,
            as: 'assignments',
            required: false,
            order: [['orderNumber', 'ASC']]
          }
        ]
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
      }

      res.json({
        success: true,
        lesson
      });
    } catch (error) {
      console.error('Error fetching lesson:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch lesson',
        error: error.message
      });
    }
  },

  // Create new lesson
  createLesson: async (req, res) => {
    try {
      const { moduleId, name, detail, anchorName, orderNumber, images, videos, keyPoints } = req.body;

      const lesson = await IslamicLesson.create({
        moduleId,
        name,
        detail,
        anchorName,
        orderNumber: orderNumber || 0,
        images: images || [],
        videos: videos || [],
        keyPoints: keyPoints || []
      });

      res.json({
        success: true,
        message: 'Lesson created successfully',
        lesson
      });
    } catch (error) {
      console.error('Error creating lesson:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create lesson',
        error: error.message
      });
    }
  },

  // Update lesson
  updateLesson: async (req, res) => {
    try {
      const { lessonId } = req.params;
      const updates = req.body;

      const lesson = await IslamicLesson.findByPk(lessonId);
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
      }

      await lesson.update(updates);

      res.json({
        success: true,
        message: 'Lesson updated successfully',
        lesson
      });
    } catch (error) {
      console.error('Error updating lesson:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update lesson',
        error: error.message
      });
    }
  },

  // Delete lesson
  deleteLesson: async (req, res) => {
    try {
      const { lessonId } = req.params;

      const lesson = await IslamicLesson.findByPk(lessonId);
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
      }

      await lesson.destroy();

      res.json({
        success: true,
        message: 'Lesson deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete lesson',
        error: error.message
      });
    }
  },

  // ==================== RESOURCES ====================

  // Create new resource
  createResource: async (req, res) => {
    try {
      const { lessonId, name, type, link, author, description, isRequired, orderNumber } = req.body;

      const resource = await IslamicResource.create({
        lessonId,
        name,
        type,
        link,
        author,
        description,
        isRequired: isRequired || false,
        orderNumber: orderNumber || 0
      });

      res.json({
        success: true,
        message: 'Resource created successfully',
        resource
      });
    } catch (error) {
      console.error('Error creating resource:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create resource',
        error: error.message
      });
    }
  },

  // Update resource
  updateResource: async (req, res) => {
    try {
      const { resourceId } = req.params;
      const updates = req.body;

      const resource = await IslamicResource.findByPk(resourceId);
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      await resource.update(updates);

      res.json({
        success: true,
        message: 'Resource updated successfully',
        resource
      });
    } catch (error) {
      console.error('Error updating resource:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update resource',
        error: error.message
      });
    }
  },

  // Delete resource
  deleteResource: async (req, res) => {
    try {
      const { resourceId } = req.params;

      const resource = await IslamicResource.findByPk(resourceId);
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      await resource.destroy();

      res.json({
        success: true,
        message: 'Resource deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting resource:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete resource',
        error: error.message
      });
    }
  },

  // ==================== ASSIGNMENTS ====================

  // Create new assignment
  createAssignment: async (req, res) => {
    try {
      const { lessonId, name, type, description, completionCriteria, estimatedMinutes, orderNumber, submissionRequired } = req.body;

      const assignment = await IslamicAssignment.create({
        lessonId,
        name,
        type,
        description,
        completionCriteria,
        estimatedMinutes,
        orderNumber: orderNumber || 0,
        submissionRequired: submissionRequired || false
      });

      res.json({
        success: true,
        message: 'Assignment created successfully',
        assignment
      });
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create assignment',
        error: error.message
      });
    }
  },

  // Update assignment
  updateAssignment: async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const updates = req.body;

      const assignment = await IslamicAssignment.findByPk(assignmentId);
      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: 'Assignment not found'
        });
      }

      await assignment.update(updates);

      res.json({
        success: true,
        message: 'Assignment updated successfully',
        assignment
      });
    } catch (error) {
      console.error('Error updating assignment:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update assignment',
        error: error.message
      });
    }
  },

  // Delete assignment
  deleteAssignment: async (req, res) => {
    try {
      const { assignmentId } = req.params;

      const assignment = await IslamicAssignment.findByPk(assignmentId);
      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: 'Assignment not found'
        });
      }

      await assignment.destroy();

      res.json({
        success: true,
        message: 'Assignment deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting assignment:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete assignment',
        error: error.message
      });
    }
  },

  // ==================== USER PROGRESS ====================

  // Get user's overall progress
  getUserProgress: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
      }

      const progress = await UserCourseProgress.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        progress
      });
    } catch (error) {
      console.error('Error fetching user progress:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user progress',
        error: error.message
      });
    }
  },

  // Get user progress for specific module
  getUserProgressByModule: async (req, res) => {
    try {
      const { moduleId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
      }

      const progress = await UserCourseProgress.findAll({
        where: {
          userId,
          moduleId
        }
      });

      res.json({
        success: true,
        progress
      });
    } catch (error) {
      console.error('Error fetching module progress:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch module progress',
        error: error.message
      });
    }
  },

  // Create or update user progress
  updateProgress: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
      }

      const {
        moduleId,
        lessonId,
        assignmentId,
        status,
        completedAt,
        timeSpentMinutes,
        notes,
        submissionUrl,
        reviewedBy,
        reviewNotes
      } = req.body;

      // Find existing progress record
      const whereClause = { userId };
      if (moduleId) whereClause.moduleId = moduleId;
      if (lessonId) whereClause.lessonId = lessonId;
      if (assignmentId) whereClause.assignmentId = assignmentId;

      let progress = await UserCourseProgress.findOne({ where: whereClause });

      if (progress) {
        // Update existing progress
        await progress.update({
          status,
          completedAt,
          timeSpentMinutes: timeSpentMinutes !== undefined ? timeSpentMinutes : progress.timeSpentMinutes,
          notes: notes !== undefined ? notes : progress.notes,
          submissionUrl: submissionUrl !== undefined ? submissionUrl : progress.submissionUrl,
          reviewedBy: reviewedBy !== undefined ? reviewedBy : progress.reviewedBy,
          reviewNotes: reviewNotes !== undefined ? reviewNotes : progress.reviewNotes
        });
      } else {
        // Create new progress record
        progress = await UserCourseProgress.create({
          userId,
          moduleId,
          lessonId,
          assignmentId,
          status: status || 'in_progress',
          completedAt,
          timeSpentMinutes: timeSpentMinutes || 0,
          notes,
          submissionUrl,
          reviewedBy,
          reviewNotes
        });
      }

      res.json({
        success: true,
        message: 'Progress updated successfully',
        progress
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update progress',
        error: error.message
      });
    }
  }
};

module.exports = islamicCourseCtrl;
