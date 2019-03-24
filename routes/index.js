var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.findAll("customers", (e, docs) => {
    if (e) {
      return console.log(e);
    }
    res.render('index', {
      title: 'Lista de Clientes',
      docs: docs
    });
  })
})

/* GET cadastro page. */
router.get('/new', function (req, res) {
  res.render('new', {
    title: 'Novo Cadastro',
    doc: {
      "nome": "",
      "dataDeNascimento": "",
      "telefone": "",
      "tamanhoSutia": "",
      "tamanhoCalcinha": "",
      "coresPreferidas": "",
      "observacoes": ""
    },
    action: '/new'
  });
});

/* POST cadastro page. */
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

  global.db.insert(newCostumer, "customers", (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  })
});

/* GET atualização page. */
router.get('/edit/:id', function (req, res, next) {
  const id = req.params.id

  global.db.findOne(id, "customers", (e, docs) => {
    if (e) {
      return console.log(e);
    }
    res.render('new', {
      title: 'Edição de Cliente',
      doc: docs[0],
      action: '/edit/' + docs[0]._id
    });
  })
});

/* POST atualização page. */
router.post('/edit/:id', function (req, res) {
  const id = req.params.id
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

  global.db.update(id, newCostumer, "customers", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  })
});

module.exports = router;