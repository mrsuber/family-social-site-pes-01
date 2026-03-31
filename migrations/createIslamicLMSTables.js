const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create islamic_course_modules table
    await queryInterface.createTable('islamic_course_modules', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'departments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      objective_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      order_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'draft'
      },
      estimated_hours: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create islamic_lessons table
    await queryInterface.createTable('islamic_lessons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      module_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'islamic_course_modules',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      anchor_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      order_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      images: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      videos: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      key_points: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create islamic_resources table
    await queryInterface.createTable('islamic_resources', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'islamic_lessons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      order_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create islamic_assignments table
    await queryInterface.createTable('islamic_assignments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'islamic_lessons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      completion_criteria: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      estimated_minutes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      order_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      submission_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create user_course_progress table
    await queryInterface.createTable('user_course_progress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      module_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'islamic_course_modules',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'islamic_lessons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      assignment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'islamic_assignments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'not_started'
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      time_spent_minutes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      submission_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      reviewed_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      review_notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    console.log('✅ Islamic LMS tables created successfully!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_course_progress');
    await queryInterface.dropTable('islamic_assignments');
    await queryInterface.dropTable('islamic_resources');
    await queryInterface.dropTable('islamic_lessons');
    await queryInterface.dropTable('islamic_course_modules');

    console.log('✅ Islamic LMS tables dropped successfully!');
  }
};
