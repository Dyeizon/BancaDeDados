const express = require('express');
const router = express.Router();
const {Pool} = require("pg");
const credentials = require('../database/credentials');

// Rota par a página administrativa principal dos Gerentes
router.get("/gerentes/pagina/:pagina", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from gerente limit 5 offset ` + ((parseInt(req.params.pagina, 10) - 1) * 5);

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('gerentes', {
            select: result.rows,
            pagina: req.params.pagina
        });
    });
});

// Rota para a página administrativa de cadastro dos Gerentes
router.get("/gerentes/cadastrar", function(req, res) {
    res.render('operacoes/cadastrar', {
        nome: 'Gerente',
        tabela: 'gerente'
    });
});

// Rota para a página administrativa de update dos Gerentes
router.get("/gerentes/atualizar/:gerenteId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from gerente where idgerente='` + req.params.gerenteId + `'`;

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('operacoes/atualizar', {
            nome: 'Gerente',
            tabela: 'gerente',
            id: req.params.gerenteId,
            select: result.rows
        });
    });
});

// Rota para a página administrativa de remoção dos Gerentes
router.get("/gerentes/remover/:gerenteId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `delete from gerente where idgerente=` + req.params.gerenteId;
    pool.query(sql);
    pool.end();

    res.redirect("/gerentes/pagina/1");
});

module.exports = router;
