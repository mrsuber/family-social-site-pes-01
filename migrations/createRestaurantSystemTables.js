const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    // Create suppliers table first (referenced by inventory_items)
    await queryInterface.createTable('suppliers', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contact_person: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.TEXT
      },
      products_supplied: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      payment_terms: {
        type: DataTypes.STRING
      },
      delivery_schedule: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      notes: {
        type: DataTypes.TEXT
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Create restaurants table
    await queryInterface.createTable('restaurants', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.TEXT
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      capacity: {
        type: DataTypes.INTEGER
      },
      operating_hours: {
        type: DataTypes.JSONB,
        defaultValue: {}
      },
      status: {
        type: DataTypes.ENUM('active', 'planning', 'closed'),
        defaultValue: 'planning'
      },
      manager_id: {
        type: DataTypes.UUID,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      department_id: {
        type: DataTypes.UUID,
        references: {
          model: 'departments',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Create inventory_items table
    await queryInterface.createTable('inventory_items', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      restaurant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.ENUM('dry_goods', 'proteins', 'produce', 'liquids', 'spices', 'dairy', 'other'),
        allowNull: false
      },
      current_stock: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      minimum_stock: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      cost_per_unit: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      supplier_id: {
        type: DataTypes.UUID,
        references: {
          model: 'suppliers',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      expiration_date: {
        type: DataTypes.DATE
      },
      storage_location: {
        type: DataTypes.STRING
      },
      last_restocked: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM('in_stock', 'low_stock', 'out_of_stock'),
        defaultValue: 'in_stock'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Create menu_items table
    await queryInterface.createTable('menu_items', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      restaurant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      category: {
        type: DataTypes.ENUM('appetizer', 'main_course', 'side', 'dessert', 'drink', 'special'),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'XAF'
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: []
      },
      preparation_time: {
        type: DataTypes.INTEGER
      },
      serving_size: {
        type: DataTypes.STRING
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      is_popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      dietary_info: {
        type: DataTypes.JSONB,
        defaultValue: {}
      },
      nutritional_info: {
        type: DataTypes.JSONB,
        defaultValue: {}
      },
      spicy_level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status: {
        type: DataTypes.ENUM('active', 'seasonal', 'discontinued'),
        defaultValue: 'active'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Create restaurant_orders table (POS)
    await queryInterface.createTable('restaurant_orders', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      order_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      restaurant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      order_type: {
        type: DataTypes.ENUM('dine_in', 'takeout', 'delivery'),
        allowNull: false
      },
      table_number: {
        type: DataTypes.STRING
      },
      customer_id: {
        type: DataTypes.UUID,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      items: {
        type: DataTypes.JSONB,
        defaultValue: []
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      payment_method: {
        type: DataTypes.ENUM('cash', 'card', 'mobile_money', 'account'),
        defaultValue: 'cash'
      },
      payment_status: {
        type: DataTypes.ENUM('pending', 'paid', 'refunded'),
        defaultValue: 'pending'
      },
      order_status: {
        type: DataTypes.ENUM('received', 'preparing', 'ready', 'served', 'completed', 'cancelled'),
        defaultValue: 'received'
      },
      served_by: {
        type: DataTypes.UUID,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      prepared_by: {
        type: DataTypes.UUID,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      ordered_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      prepared_at: {
        type: DataTypes.DATE
      },
      served_at: {
        type: DataTypes.DATE
      },
      notes: {
        type: DataTypes.TEXT
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });

    // Add indexes for better query performance
    await queryInterface.addIndex('restaurants', ['department_id']);
    await queryInterface.addIndex('restaurants', ['status']);
    await queryInterface.addIndex('inventory_items', ['restaurant_id']);
    await queryInterface.addIndex('inventory_items', ['status']);
    await queryInterface.addIndex('inventory_items', ['category']);
    await queryInterface.addIndex('menu_items', ['restaurant_id']);
    await queryInterface.addIndex('menu_items', ['category']);
    await queryInterface.addIndex('menu_items', ['status']);
    await queryInterface.addIndex('restaurant_orders', ['restaurant_id']);
    await queryInterface.addIndex('restaurant_orders', ['order_status']);
    await queryInterface.addIndex('restaurant_orders', ['payment_status']);
    await queryInterface.addIndex('restaurant_orders', ['order_number']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('restaurant_orders');
    await queryInterface.dropTable('menu_items');
    await queryInterface.dropTable('inventory_items');
    await queryInterface.dropTable('restaurants');
    await queryInterface.dropTable('suppliers');
  }
};
