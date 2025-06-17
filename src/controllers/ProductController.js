const { Product, Category } = require('../models');

module.exports = {
  // Listar todos os produtos
  async index(req, res) {
    try {
      const products = await Product.findAll({
        include: { association: 'category', attributes: ['id', 'name'] } // Inclui dados da categoria
      });
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar produtos', details: err.message });
    }
  },

  // Criar um novo produto
  async store(req, res) {
    const { name, description, price, stock_quantity, categoryId } = req.body;
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Categoria não encontrada.' });
      }
      
      const product = await Product.create({ name, description, price, stock_quantity, categoryId });
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao criar produto', details: err.message });
    }
  },
  
  // Atualizar um produto
  async update(req, res) {
    const { id } = req.params;
    const { name, description, price, stock_quantity, categoryId } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          return res.status(400).json({ error: 'Categoria não encontrada.' });
        }
      }

      await product.update({ name, description, price, stock_quantity, categoryId });
      return res.json(product);
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao atualizar produto', details: err.message });
    }
  },

  // Deletar um produto
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      await product.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar produto', details: err.message });
    }
  }
};