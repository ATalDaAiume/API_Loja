const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

// Importação dos Models
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');
const Order = require('../models/order');

const connection = new Sequelize(dbConfig.development);

// Inicialização dos Models
User.init(connection);
Category.init(connection);
Product.init(connection);
Order.init(connection);

// Associação dos Models
User.associate(connection.models);
Category.associate(connection.models);
Product.associate(connection.models);
Order.associate(connection.models);

module.exports = connection;