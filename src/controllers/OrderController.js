const { Order, Product } = require('../models');

module.exports = {
  // Listar os pedidos do usuário logado
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.userId }, // Apenas pedidos do usuário autenticado
        include: { 
          association: 'products',
          attributes: ['id', 'name'], // Simplifica os dados dos produtos
          through: { attributes: ['quantity', 'price'] } // Inclui dados da tabela de junção
        }
      });
      return res.json(orders);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar pedidos', details: err.message });
    }
  },

  // Criar um novo pedido
  async store(req, res) {
    const { products } = req.body; // Ex: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }]
    const userId = req.userId;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: 'A lista de produtos não pode ser vazia.' });
    }

    try {
      // Cria a entrada principal na tabela 'Orders'
      const order = await Order.create({ userId, status: 'pending' });

      // Prepara os produtos para adicionar na tabela de junção 'OrderProducts'
      for (const p of products) {
        const product = await Product.findByPk(p.productId);
        if (!product) {
          // Importante: em um cenário real, você deveria cancelar a transação toda aqui.
          return res.status(404).json({ error: `Produto com ID ${p.productId} não encontrado.` });
        }
        // Adiciona o produto ao pedido na tabela de junção, incluindo a quantidade e o preço daquele momento
        await order.addProduct(product, { through: { quantity: p.quantity, price: product.price } });
      }

      // Recarrega o pedido com os produtos para retornar a resposta completa
      const finalOrder = await Order.findByPk(order.id, {
          include: { association: 'products' }
      });

      return res.status(201).json(finalOrder);
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao criar pedido', details: err.message });
    }
  }
};