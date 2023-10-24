const express = require('express');
const router = express.Router();

// Defina as rotas para a catraca aqui
router.get('/', (req, res) => {
  // Rota principal da catraca
  res.render('catraca/index'); // Exemplo de renderização de uma página
});

module.exports = router;