// Re-export just the sequelize instance for models
// Models use: const sequelize = require('../config/database');
const { sequelize } = require('./db');

module.exports = sequelize;
