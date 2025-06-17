const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
// const productRoutes = require('./productRoutes'); // Adicionar quando criar
// const categoryRoutes = require('./categoryRoutes'); // Adicionar quando criar

router.use('/users', userRoutes);
// router.use('/products', productRoutes);
// router.use('/categories', categoryRoutes);

module.exports = router;