const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes'); // Adicionar
const orderRoutes = require('./orderRoutes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes); // Adicionar
router.use('/orders', orderRoutes);

module.exports = router;
