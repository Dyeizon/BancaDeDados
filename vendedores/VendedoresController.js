const express = require('express');
const router = express.Router();
const {Pool} = require("pg");
const credentials = require('../database/credentials');

// Rota par a página administrativa principal dos Vendedores
router.get("/vendedores/pagina/:pagina", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from vendedor limit 5 offset ` + ((parseInt(req.params.pagina, 10) - 1) * 5);

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('vendedores', {
            select: result.rows,
            pagina: req.params.pagina
        });
    });
});

// Rota para a página administrativa de cadastro dos Gerentes
router.get("/vendedores/cadastrar", function(req, res) {
    res.render('operacoes/cadastrar', {
        nome: 'Vendedor',
        tabela: 'vendedor'
    });
});

// Rota para a página administrativa de update dos Vendedores
router.get("/vendedores/atualizar/:vendedorId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from vendedor where idvendedor='` + req.params.vendedorId + `'`;

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('operacoes/atualizar', {
            nome: 'Vendedor',
            tabela: 'vendedor',
            id: req.params.vendedorId,
            select: result.rows
        });
    });
});

// Rota para a página administrativa de remoção dos Vendedores
router.get("/vendedores/remover/:vendedorId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `delete from vendedor where idvendedor=` + req.params.vendedorId;
    pool.query(sql);
    pool.end();

    res.redirect("/vendedores/pagina/1");
});

module.exports = router;
