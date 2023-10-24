const express = require('express');
const router = express.Router();

// Defina as rotas para o site público aqui
router.get('/', (req, res) => {
  // Rota principal do site público
  res.render('fasttravel/index'); // Exemplo de renderização de uma página
});

router.get('/recarga', (req, res) => {
  res.render('fasttravel/recarga');
});

router.get('/linhas', (req, res) => {
  res.render('fasttravel/linhas');
});

module.exports = router;