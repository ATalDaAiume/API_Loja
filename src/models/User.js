const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize,
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        }
      }
    });
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
  }

  // Método para checar a senha
  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;