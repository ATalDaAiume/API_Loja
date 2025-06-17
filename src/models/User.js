'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    }

    // Adicionado de volta o método para comparar senhas
    checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user) => {
        if (user.password && user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      }
    }
  });

  return User;
};