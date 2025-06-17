const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 * name: Orders
 * description: Gerenciamento de pedidos
 */

// Todas as rotas de pedido requerem autenticação
router.use(authMiddleware);

router.get('/', OrderController.index);
router.get('/:id', OrderController.show); // ROTA ADICIONADA
router.post('/', OrderController.store);
router.patch('/:id/cancel', OrderController.cancel); // ROTA ADICIONADA (PATCH é ideal para atualizações parciais)

module.exports = router;