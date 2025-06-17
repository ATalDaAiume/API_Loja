'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define que um Pedido PERTENCE A um Usuário
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      // Define que um Pedido PERTENCE A MUITOS Produtos, através da tabela OrderProduct
      this.belongsToMany(models.Product, { 
        foreignKey: 'orderId', 
        through: 'OrderProducts', // Nome da tabela de junção
        as: 'products' 
      });
    }
  }
  Order.init({
    // Ex: 'pending', 'completed', 'canceled'
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};