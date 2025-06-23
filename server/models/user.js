const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

// Define the model
const User = sequelize.define('user', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  event: DataTypes.STRING,
}, {
  tableName: 'users',  // explicitly set table name to avoid confusion
  timestamps: true,    // default true, manages createdAt and updatedAt
});

// Export both sequelize instance and model
module.exports = { User, sequelize };
