const Sequelize = require('sequelize');
const dbConfig = require('../config/config');
const Product = require('../models/Product');
const Order = require('../models/order');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product'); // Adicionar
Product.init(sequelize); // Usei 'sequelize' como variável de conexão
Order.init(sequelize);

const connection = new Sequelize(dbConfig[process.env.NODE_ENV || 'development']);

User.init(connection);
Category.init(connection);
Product.init(connection); // Adicionar

// Chamar associações
Product.associate(connection.models);
Category.associate(connection.models);
User.associate(sequelize.models);
Category.associate(sequelize.models);
Product.associate(sequelize.models);
Order.associate(sequelize.models);

module.exports = connection;