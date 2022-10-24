const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");


// Database
const {Pool} = require("pg");
const credentials = require('./database/credentials')


// Cria uma aplicação Express
const app = express();

// Define que o mecanismo de renderização das páginas HTML será o EJS
app.set('view engine', 'ejs');

// Define o diretório dos arquivos estáticos (CSS, IMG...)
app.use(express.static('public'));

// Define que a aplicação utilizará o BodyParser para tratar as informações vindas de um formulário
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Cria uma rota para a página inicial '/'
app.get("/", function(req, res) {
    res.render('index');
});

app.get("/clientes", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `select * from Cliente`;

    pool.query(sql).then((result) => {
        pool.end(); 
        res.render('clientes', {
            select: result.rows
        });
    });
});

app.get("/clientes/cadastrar", function(req, res) {
    res.render('operacoes/cadastrar', {
        nome: 'Cliente',
        tabela: 'cliente'
    });
});

app.get("/clientes/atualizar/:clienteId", function(req, res) {
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

app.get("/clientes/remover/:clienteId", function(req, res) {
    const pool = new Pool(credentials);
    const sql = `delete from cliente where idcliente=` + req.params.clienteId;

    pool.query(sql);
    pool.end();

    res.redirect("/clientes");
});

app.get("/gerentes", function(req, res) {
    res.render('gerentes');
});

app.get("/gerentes/cadastrar", function(req, res) {
    res.render('operacoes/cadastrar', {
        nome: 'Gerente',
        tabela: 'gerente'
    });
})

app.get("/vendedores", function(req, res) {
    res.render('vendedores');
});

app.get("/produtos", function(req, res) {
    res.render('produtos/produtos');
});

app.get("/estoques", function(req, res) {
    res.render('estoques/estoques');
});

app.get("/fornecedores", function(req, res) {
    res.render('fornecedores/fornecedores');
});

app.get("/banca", function(req, res) {
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

app.get("/compras", function(req, res) {
    res.render('compras/compras');
});

app.get("/notasfiscais", function(req, res) {
    res.render('notasfiscais/notasfiscais');
});

// Cria uma rota que irá coletar os dados do formulário de cadastro
app.post("/realizarCadastro", (req, res) => {
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

        
        res.redirect("clientes");

    // Se Gerente
    } else if(tabela == 'gerente') {
        var nome = req.body.nome;
        if(nome) {
            const sql = `insert into gerente (nome) values ($1)`;
            const values = [nome];
        
            pool.query(sql, values);
        }
    }    
});

// Cria uma rota que irá coletar os dados do formulário de atualização
app.post("/atualizarCadastro", (req, res) => {
    var tabela = req.body.tabela;
    const pool = new Pool(credentials);

    if(tabela == 'cliente') {
        const sql = `update cliente set
                        nome = $1, 
                        telefone = $2,
                        cpf = $3,
                        email = $4

                    where idcliente = $5`;

        const values = [req.body.nome, req.body.telefone, req.body.cpf, req.body.email, req.body.id];
        pool.query(sql, values);

        pool.end();
        res.redirect("/clientes");
    
    }
});




// Inicializa o servidor na porta 8080 (variável), e trata um possível erro
app.listen(80, function(error) {
    if(error) {
        console.log("O servidor não foi inicialiado corretamente.");
    } else {
        console.log("O servidor está em execução.")
    }
});