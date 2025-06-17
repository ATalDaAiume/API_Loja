const { Category } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.update({ name });
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.destroy();
      return res.status(204).send(); // 204 No Content
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};