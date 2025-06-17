const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 * - name: Products
 * description: Gerenciamento de produtos
 */

router.get('/', ProductController.index);
router.get('/:id', ProductController.show);
router.post('/', authMiddleware, ProductController.store);
router.put('/:id', authMiddleware, ProductController.update);
router.delete('/:id', authMiddleware, ProductController.destroy);

module.exports = router;