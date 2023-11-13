const express = require('express');
const router = express.Router();

// Defina as rotas para a catraca aqui
router.get('/', (req, res) => {
  // Rota principal da catraca
  res.render('catraca/aproximar'); // Exemplo de renderização de uma página
});

router.get('/error/:id', (req, res) => {
  res.render('catraca/valid_error');
});

router.get('/true/:id', (req, res) => {
  res.render('catraca/valid_true');
});

module.exports = router;