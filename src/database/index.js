const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product'); // Adicionar

const connection = new Sequelize(dbConfig[process.env.NODE_ENV || 'development']);

User.init(connection);
Category.init(connection);
Product.init(connection); // Adicionar

// Chamar associações
Product.associate(connection.models);
Category.associate(connection.models);

module.exports = connection;