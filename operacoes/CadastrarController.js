const express = require('express');
const router = express.Router();
const { Pool } = require("pg");
const credentials = require('../database/credentials');
const bcrypt = require("bcrypt");

router.post("/realizarCadastro", (req, res) => {
    var tabela = req.body.tabela;
    const pool = new Pool(credentials);
    
    // Se Cliente
    if(tabela == 'cliente') {
        if(req.body.telefone) {
            bcrypt.hash(req.body.senha, 10, function(err, hash) {
                if(!err) {
                    var senhaCodificada = hash;
                    const sql = `insert into cliente (nome, telefone, cpf, email, senha) values ($1, $2, $3, $4, $5)`;
                    const values = [req.body.nome, req.body.telefone, req.body.cpf, req.body.email, senhaCodificada];

                    pool.query(sql, values);
                    pool.end();
                } else {
                    console.log("Ocorreu um erro na encriptação da senha.");
                }
            })
        } else {
            bcrypt.hash(req.body.senha, 10, function(err, hash) {
                if(!err) {
                    var senhaCodificada = hash;
                    const sql = `insert into cliente (nome, cpf, email, senha) values ($1, $2, $3, $4)`;
                    const values = [req.body.nome, req.body.cpf, req.body.email, senhaCodificada];

                    pool.query(sql, values);
                    pool.end();
                } else {
                    console.log("Ocorreu um erro na encriptação da senha.");
                }
            })
        }
      
        res.redirect("clientes/pagina/1");

    // Se Gerente
    } else if(tabela == 'gerente') {
        bcrypt.hash(req.body.senha, 10, function(err, hash) {
            if(!err) {
                var senhaCodificada = hash;
                const sql = `insert into gerente (nome, email, senha, salario) values ($1, $2, $3, $4)`;
                const values = [req.body.nome, req.body.email, senhaCodificada, req.body.salario];

                pool.query(sql, values);
                pool.end();
            } else {
                console.log("Ocorreu um erro na encriptação da senha.");
            }
        })
        res.redirect("gerentes/pagina/1");
    } else if (tabela == 'vendedor') {
        bcrypt.hash(req.body.senha, 10, function(err, hash) {
            if(!err) {
                var senhaCodificada = hash;
                const sql = `insert into vendedor (nome, email, senha, salario, comissao) values ($1, $2, $3, $4, $5)`;
                const values = [req.body.nome, req.body.email, senhaCodificada, req.body.salario, req.body.comissao];

                pool.query(sql, values);
                pool.end();
            } else {
                console.log("Ocorreu um erro na encriptação da senha.");
            }
        })
        res.redirect("vendedores/pagina/1");
    } else {
        res.redirect("/");
    }    
});

module.exports = router;