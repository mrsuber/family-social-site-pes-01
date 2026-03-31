const IslamicCourseModule = require('./IslamicCourseModule');
const IslamicLesson = require('./IslamicLesson');
const IslamicResource = require('./IslamicResource');
const IslamicAssignment = require('./IslamicAssignment');
const UserCourseProgress = require('./UserCourseProgress');
const Department = require('./Department');
const User = require('./User');

// Set up all associations for Islamic LMS models
function setupIslamicCourseAssociations() {
  // IslamicCourseModule belongs to Department
  IslamicCourseModule.belongsTo(Department, {
    foreignKey: 'departmentId',
    as: 'department'
  });

  // Department has many IslamicCourseModules
  Department.hasMany(IslamicCourseModule, {
    foreignKey: 'departmentId',
    as: 'islamicModules'
  });

  // IslamicLesson belongs to IslamicCourseModule
  IslamicLesson.belongsTo(IslamicCourseModule, {
    foreignKey: 'moduleId',
    as: 'module'
  });

  // IslamicCourseModule has many IslamicLessons
  IslamicCourseModule.hasMany(IslamicLesson, {
    foreignKey: 'moduleId',
    as: 'lessons'
  });

  // IslamicResource belongs to IslamicLesson
  IslamicResource.belongsTo(IslamicLesson, {
    foreignKey: 'lessonId',
    as: 'lesson'
  });

  // IslamicLesson has many IslamicResources
  IslamicLesson.hasMany(IslamicResource, {
    foreignKey: 'lessonId',
    as: 'resources'
  });

  // IslamicAssignment belongs to IslamicLesson
  IslamicAssignment.belongsTo(IslamicLesson, {
    foreignKey: 'lessonId',
    as: 'lesson'
  });

  // IslamicLesson has many IslamicAssignments
  IslamicLesson.hasMany(IslamicAssignment, {
    foreignKey: 'lessonId',
    as: 'assignments'
  });

  // UserCourseProgress belongs to User
  UserCourseProgress.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  // User has many UserCourseProgress records
  User.hasMany(UserCourseProgress, {
    foreignKey: 'userId',
    as: 'courseProgress'
  });

  // UserCourseProgress belongs to IslamicCourseModule (optional)
  UserCourseProgress.belongsTo(IslamicCourseModule, {
    foreignKey: 'moduleId',
    as: 'module'
  });

  // UserCourseProgress belongs to IslamicLesson (optional)
  UserCourseProgress.belongsTo(IslamicLesson, {
    foreignKey: 'lessonId',
    as: 'lesson'
  });

  // UserCourseProgress belongs to IslamicAssignment (optional)
  UserCourseProgress.belongsTo(IslamicAssignment, {
    foreignKey: 'assignmentId',
    as: 'assignment'
  });

  // UserCourseProgress belongs to User (reviewer)
  UserCourseProgress.belongsTo(User, {
    foreignKey: 'reviewedBy',
    as: 'reviewer'
  });

  console.log('✅ Islamic LMS model associations set up successfully');
}

module.exports = setupIslamicCourseAssociations;
