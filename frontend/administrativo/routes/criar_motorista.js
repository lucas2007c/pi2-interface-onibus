var express = require('express');
var router = express.Router();

router.post('/motorista', function(req, res, next) {
  res.render('index/cadastrar');
});

router.get('/motorista', function(req, res, next) {
  res.render('index/motorista');
});

module.exports = router;
