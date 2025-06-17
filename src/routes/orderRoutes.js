const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 * - name: Orders
 * description: Gerenciamento de pedidos
 */

router.use(authMiddleware);

router.get('/', OrderController.index);
router.get('/:id', OrderController.show);
router.post('/', OrderController.store);
router.patch('/:id/cancel', OrderController.cancel);

module.exports = router;