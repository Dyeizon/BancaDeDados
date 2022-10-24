const express = require('express');
const router = express.Router();
const {Pool} = require("pg");
const credentials = require('../database/credentials');

// Rota par a página administrativa principal dos Clientes
router.get("/clientes/pagina/:pagina", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from Cliente limit 5 offset ` + ((parseInt(req.params.pagina, 10) - 1) * 5);

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('clientes', {
            select: result.rows,
            pagina: req.params.pagina
        });
    });
});

// Rota para a página administrativa de cadastro dos Clientes
router.get("/clientes/cadastrar", function(req, res) {
    res.render('operacoes/cadastrar', {
        nome: 'Cliente',
        tabela: 'cliente'
    });
});

// Rota para a página administrativa de update dos Clientes
router.get("/clientes/atualizar/:clienteId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from Cliente where idcliente='` + req.params.clienteId + `'`;

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('operacoes/atualizar', {
            nome: 'Cliente',
            tabela: 'cliente',
            id: req.params.clienteId,
            select: result.rows
        });
    });
});

// Rota para a página administrativa de remoção dos Clientes
router.get("/clientes/remover/:clienteId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `delete from cliente where idcliente=` + req.params.clienteId;
    pool.query(sql);
    pool.end();

    res.redirect("/clientes/pagina/1");
});

module.exports = router;
