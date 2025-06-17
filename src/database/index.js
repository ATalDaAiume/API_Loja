const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js');

const User = require('../models/User');
const Category = require('../models/Category'); // Importar novo model

const connection = new Sequelize(dbConfig.development);

User.init(connection);
Category.init(connection); // Inicializar novo model

// Chamar associações se existirem
Category.associate(connection.models);

module.exports = connection;