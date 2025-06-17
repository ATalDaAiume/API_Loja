const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes'); // Importar novas rotas

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes); // Usar novas rotas

module.exports = router;