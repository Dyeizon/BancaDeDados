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
    } else if (tabela == 'gerente') {
        if(req.body.senha) {
            bcrypt.hash(req.body.senha, 10, function(err, hash) {
                if(!err) {
                    var senhaCodificada = hash;

                    const sql = `update gerente set
                        nome = $1, 
                        email = $2,
                        senha = $3,
                        salario = $4

                        where idgerente = $5`;

                    const values = [req.body.nome, req.body.email, senhaCodificada, req.body.salario, req.body.id];
                    pool.query(sql, values);
                    pool.end();
                } else {
                    console.log("Ocorreu um erro na encriptação da senha.");
                }
            });
        } else {
            const sql = `update gerente set
            nome = $1, 
            email = $2,
            salario = $3

            where idgerente = $4`;

            const values = [req.body.nome, req.body.email, req.body.salario, req.body.id];
            pool.query(sql, values);
            pool.end();
        }
        res.redirect("gerentes/pagina/1"); 
    } else if (tabela == 'vendedor'){
        if(req.body.senha) {
            bcrypt.hash(req.body.senha, 10, function(err, hash) {
                if(!err) {
                    var senhaCodificada = hash;

                    const sql = `update vendedor set
                        nome = $1, 
                        email = $2,
                        senha = $3,
                        salario = $4,
                        comissao = $5

                        where idvendedor = $6`;

                    const values = [req.body.nome, req.body.email, senhaCodificada, req.body.salario, req.body.comissao, req.body.id];
                    pool.query(sql, values);
                    pool.end();
                } else {
                    console.log("Ocorreu um erro na encriptação da senha.");
                }
            });
        } else {
            const sql = `update vendedor set
            nome = $1, 
            email = $2,
            salario = $3,
            comissao = $4

            where idvendedor = $5`;

            const values = [req.body.nome, req.body.email, parseFloat(req.body.salario), req.body.comissao, req.body.id];
            pool.query(sql, values);
            pool.end();
        }
        res.redirect("vendedores/pagina/1"); 
    } else {
        res.redirect("/");
    }

});

module.exports = router;