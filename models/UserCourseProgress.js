const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class UserCourseProgress extends Model {}

UserCourseProgress.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'User taking the course'
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'module_id',
      references: {
        model: 'islamic_course_modules',
        key: 'id'
      },
      comment: 'Module progress (null if tracking lesson/assignment)'
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'lesson_id',
      references: {
        model: 'islamic_lessons',
        key: 'id'
      },
      comment: 'Lesson progress (null if tracking module/assignment)'
    },
    assignmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'assignment_id',
      references: {
        model: 'islamic_assignments',
        key: 'id'
      },
      comment: 'Assignment progress (null if tracking module/lesson)'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'not_started',
      comment: 'not_started, in_progress, completed, certified'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at',
      comment: 'When this item was completed'
    },
    timeSpentMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'time_spent_minutes',
      comment: 'Total time spent on this item'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'User\'s personal notes on this item'
    },
    submissionUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'submission_url',
      comment: 'URL to submitted assignment work (if applicable)'
    },
    reviewedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'reviewed_by',
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'Instructor/reviewer who checked the submission'
    },
    reviewNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'review_notes',
      comment: 'Feedback from reviewer'
    }
  },
  {
    sequelize,
    modelName: 'UserCourseProgress',
    tableName: 'user_course_progress',
    timestamps: true,
    underscored: true
  }
);

module.exports = UserCourseProgress;
