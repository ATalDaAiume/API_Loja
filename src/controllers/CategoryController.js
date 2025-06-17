const { Category } = require('../models');

module.exports = {
  // Listar todas as categorias
  async index(req, res) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar categorias', details: err.message });
    }
  },

  // Criar uma nova categoria
  async store(req, res) {
    const { name } = req.body;
    try {
      if (!name) return res.status(400).json({ error: 'O nome é obrigatório.' });
      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao criar categoria', details: err.message });
    }
  },
  
  // Atualizar uma categoria
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      await category.update({ name });
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao atualizar categoria', details: err.message });
    }
  },

  // Deletar uma categoria
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      // Adicional: verificar se a categoria tem produtos associados antes de deletar
      const productsCount = await category.countProducts();
      if (productsCount > 0) {
        return res.status(400).json({ error: 'Não é possível deletar a categoria, pois ela possui produtos associados.' });
      }

      await category.destroy();
      return res.status(204).send(); // 204 No Content
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar categoria', details: err.message });
    }
  }
};