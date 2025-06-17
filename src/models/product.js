'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Define que um Produto PERTENCE A uma Categoria
      this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    stock_quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  })
  return Product;
};