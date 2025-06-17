const { Order, Product, sequelize } = require('../models');

module.exports = {
  // Listar os pedidos do usuário logado
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.userId },
        include: { 
          association: 'products',
          attributes: ['id', 'name'],
          through: { attributes: ['quantity', 'price'] }
        },
        order: [['createdAt', 'DESC']]
      });
      return res.json(orders);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar pedidos', details: err.message });
    }
  },

  // ADICIONADO: Listar um pedido específico por ID
  async show(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const order = await Order.findOne({
        where: { id, userId }, // Garante que o usuário só pode ver seu próprio pedido
        include: {
          association: 'products',
          attributes: ['id', 'name', 'description'],
          through: { attributes: ['quantity', 'price'] }
        }
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      return res.json(order);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar pedido', details: err.message });
    }
  },

  // Criar um novo pedido
  async store(req, res) {
    const { products } = req.body;
    const userId = req.userId;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: 'A lista de produtos não pode ser vazia.' });
    }
    
    // Inicia uma transaction para garantir a integridade dos dados
    const t = await sequelize.transaction();

    try {
      const order = await Order.create({ userId, status: 'pending' }, { transaction: t });

      for (const p of products) {
        const product = await Product.findByPk(p.productId, { transaction: t });
        if (!product) {
          throw new Error(`Produto com ID ${p.productId} não encontrado.`);
        }
        if (product.stock_quantity < p.quantity) {
          throw new Error(`Estoque insuficiente para o produto ${product.name}.`);
        }
        
        // Adiciona o produto ao pedido
        await order.addProduct(product, { 
          through: { quantity: p.quantity, price: product.price },
          transaction: t 
        });

        // Diminui a quantidade do estoque
        product.stock_quantity -= p.quantity;
        await product.save({ transaction: t });
      }

      // Se tudo deu certo, commita a transaction
      await t.commit();
      
      const finalOrder = await Order.findByPk(order.id, {
          include: { association: 'products' }
      });

      return res.status(201).json(finalOrder);
    } catch (err) {
      // Se algo deu errado, reverte todas as operações
      await t.rollback();
      return res.status(400).json({ error: 'Falha ao criar pedido', details: err.message });
    }
  },

  // ADICIONADO: Cancelar um pedido
  async cancel(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    const t = await sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: { id, userId },
            include: 'products',
            transaction: t
        });

        if (!order) {
            await t.rollback();
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }
        if (order.status !== 'pending') {
            await t.rollback();
            return res.status(400).json({ error: `Não é possível cancelar um pedido com status '${order.status}'.` });
        }
        
        // Devolve os itens ao estoque
        for (const orderProduct of order.products) {
            const product = await Product.findByPk(orderProduct.id, { transaction: t });
            product.stock_quantity += orderProduct.OrderProducts.quantity;
            await product.save({ transaction: t });
        }
        
        // Atualiza o status do pedido para 'canceled'
        order.status = 'canceled';
        await order.save({ transaction: t });

        await t.commit();
        
        return res.json(order);
    } catch (err) {
        await t.rollback();
        return res.status(500).json({ error: 'Erro ao cancelar o pedido', details: err.message });
    }
  }
};