var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.findAll((e, docs) => {
    if (e) {
      return console.log(e);
    }
    res.render('index', {
      title: 'Lista de Clientes',
      docs: docs
    });
  })
})

router.get('/new', function (req, res, next) {
  res.render('new', {
    title: 'Novo Cadastro'
  });
});

router.post('/new', function (req, res) {
  const observacoes = (req.body.plusSize ? "Aceita plus size; " : "") +
    (req.body.conjunto ? "Aceita conjunto; " : "") +
    req.body.observacoes

  const newCostumer = {
    nome: req.body.nome,
    dataDeNascimento: req.body.dataDeNascimento,
    telefone: req.body.telefone,
    tamanhoSutia: req.body.tamanhoSutia,
    tamanhoCalcinha: req.body.tamanhoCalcinha,
    coresPreferidas: req.body.coresPreferidas,
    observacoes: observacoes
  }

  global.db.insert(newCostumer, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  })
});

module.exports = router;