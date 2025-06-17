const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes'); // Adicionar

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes); // Adicionar

module.exports = router;
