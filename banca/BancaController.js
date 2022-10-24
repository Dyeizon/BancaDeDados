const express = require('express');
const router = express.Router();
const { Pool } = require("pg");
const credentials = require('../database/credentials');

// Rota para a página administrativa principal da Banca
router.get("/banca", function (req, res) {
    const pool = new Pool(credentials);

    const sqlBanca = `select * from banca;`;
    const sqlCliente = `select count(*) from cliente;`;
    const sqlProduto = `select count(*) from produto;`;
    const sqlCompra = `select count(*) from compra;`;

    // Provável que isso esteja dando timeout    
    pool.query(sqlBanca).then((resultBanca) => {
        selectBanca = resultBanca.rows;

        pool.query(sqlCliente).then((resultCliente) => {
            contCliente = resultCliente.rows[0]['count'];

            pool.query(sqlProduto).then((resultProduto) => {
                contProduto = resultProduto.rows[0]['count'];

                pool.query(sqlCompra).then((resultCompra) => {
                    contCompra = resultCompra.rows[0]['count'];

                    pool.end();

                    res.render('banca', {
                        selectBanca: selectBanca,
                        contCliente: contCliente,
                        contProduto: contProduto,
                        contCompra: contCompra
                    });
                });
            });
        });
    });
});

module.exports = router;