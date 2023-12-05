const express = require('express');
const router = express.Router();

// Defina as rotas para o site administrativo aqui
router.get('/', (req, res) => {
  // Rota principal do site administrativo
  res.render('administrativo/index'); // Exemplo de renderização de uma página
});

// Rotas usuario

router.get('/usuario', (req, res) => {
  res.render('administrativo/usuario/listar');
});

router.get('/usuario/cadastrar', (req, res) => {
  res.render('administrativo/usuario/cadastrar');
});

router.get('/usuario/exibir/:id', (req, res) => {
  res.render('administrativo/usuario/exibir');
});

router.get('/usuario/editar/:id', (req, res) => {
  res.render('administrativo/usuario/editar');
});

router.get('/usuario/excluir/:id', (req, res) => {
  res.render('administrativo/usuario/excluir');
});

router.get('/usuario/conta/:id', (req, res) => {
  res.render('administrativo/usuario/minhaConta');
});

router.get('/usuario/editarConta/:id', (req, res) => {
  res.render('administrativo/usuario/editarConta');
});

// Rotas motoristas

router.get('/motorista', (req, res) => {
  res.render('administrativo/motorista/listar');
});

router.get('/motorista/cadastrar', (req, res) => {
  res.render('administrativo/motorista/cadastrar');
});

router.get('/motorista/exibir/:id', (req, res) => {
  res.render('administrativo/motorista/exibir');
});

router.get('/motorista/editar/:id', (req, res) => {
  res.render('administrativo/motorista/editar');
});

router.get('/motorista/excluir/:id', (req, res) => {
  res.render('administrativo/motorista/excluir');
});

// End rotas motoristas ---

// Rotas passageiros

router.get('/passageiro', (req, res) => {
  res.render('administrativo/passageiro/listar');
});

router.get('/passageiro/cadastrar', (req, res) => {
  res.render('administrativo/passageiro/cadastrar');
});

router.get('/passageiro/exibir/:id', (req, res) => {
  res.render('administrativo/passageiro/exibir');
});

router.get('/passageiro/editar/:id', (req, res) => {
  res.render('administrativo/passageiro/editar');
});

router.get('/passageiro/excluir/:id', (req, res) => {
  res.render('administrativo/passageiro/excluir');
});

// End rotas passageiros ---

// Rotas linhas

router.get('/linha', (req, res) => {
  res.render('administrativo/linha/listar');
});

router.get('/linha/cadastrar', (req, res) => {
  res.render('administrativo/linha/cadastrar');
});

router.get('/linha/exibir/:id', (req, res) => {
  res.render('administrativo/linha/exibir');
});

router.get('/linha/editar/:id', (req, res) => {
  res.render('administrativo/linha/editar');
});

router.get('/linha/excluir/:id', (req, res) => {
  res.render('administrativo/linha/excluir');
});

// End rotas linhas ---

// Rotas onibus

router.get('/onibus', (req, res) => {
  res.render('administrativo/onibus/listar');
});

router.get('/onibus/cadastrar', (req, res) => {
  res.render('administrativo/onibus/cadastrar');
});

router.get('/onibus/exibir/:id', (req, res) => {
  res.render('administrativo/onibus/exibir');
});

router.get('/onibus/editar/:id', (req, res) => {
  res.render('administrativo/onibus/editar');
});

router.get('/onibus/excluir/:id', (req, res) => {
  res.render('administrativo/onibus/excluir');
});

// End rotas onibus ---

// rota de login
router.get('/login', (req, res) => {
  res.render('administrativo/login');
});

// rota de cadastro
router.get('/cadastro', (req, res) => {
  res.render('administrativo/cadastro');
});

// rota do historico
router.get('/historico', (req, res) => {
  res.render('administrativo/historico');
});

module.exports = router;