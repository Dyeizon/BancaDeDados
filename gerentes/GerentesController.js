const express = require('express');
const router = express.Router();
const {Pool} = require("pg");
const credentials = require('../database/credentials');

// Rota para a página administrativa principal dos Gerentes
router.get("/gerentes", function(req, res) {
    res.render('gerentes');
});

// Rota para a página administrativa de cadastro dos Gerentes
router.get("/gerentes/cadastrar", function(req, res) {
    res.render('operacoes/cadastrar', {
        nome: 'Gerente',
        tabela: 'gerente'
    });
})

module.exports = router;