const express = require('express');
const router = express.Router();
const { Pool } = require("pg");
const credentials = require('../database/credentials');
const bcrypt = require("bcrypt");

router.post("/atualizarCadastro", (req, res) => {
    var tabela = req.body.tabela;
    const pool = new Pool(credentials);

    if(tabela == 'cliente') {
        if(req.body.senha) {
            bcrypt.hash(req.body.senha, 10, function(err, hash) {
                if(!err) {
                    var senhaCodificada = hash;

                    const sql = `update cliente set
                        nome = $1, 
                        telefone = $2,
                        cpf = $3,
                        email = $4,
                        senha = $5

                        where idcliente = $6`;

                    const values = [req.body.nome, req.body.telefone, req.body.cpf, req.body.email, senhaCodificada, req.body.id];
                    pool.query(sql, values);
                    pool.end();
                } else {
                    console.log("Ocorreu um erro na encriptação da senha.");
                }
            });
        } else {
            const sql = `update cliente set
                        nome = $1, 
                        telefone = $2,
                        cpf = $3,
                        email = $4

                        where idcliente = $5`;

                    const values = [req.body.nome, req.body.telefone, req.body.cpf, req.body.email, req.body.id];
                    pool.query(sql, values);
                    pool.end();
        }           
        res.redirect("clientes/pagina/1");   
    }
});

module.exports = router;