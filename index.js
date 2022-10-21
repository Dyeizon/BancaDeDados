const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const connection = require('./database/database');


// Database
const {Pool} = require("pg");
const credentials = require('./database/credentials')

// connection.connect();

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

    const result = pool.query(sql);
    pool.end();

    res.render('clientes/clientes', {
        select: result.rows
    });
});

app.get("/gerentes", function(req, res) {
    res.render('gerentes');
});

app.get("/operacoes/cadastrar", function(req, res) {
    res.render("operacoes/cadastrar")
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
    res.render('banca/banca');
});

app.get("/compras", function(req, res) {
    res.render('compras/compras');
});

app.get("/notasfiscais", function(req, res) {
    res.render('notasfiscais/notasfiscais');
});

// Cria uma rota que irá coletar os dados do formulário de cadastro de cliente
app.post("/cadastrarCliente", (req, res) => {
    var nome = req.body.nome;
    const pool = new Pool(credentials);

    if(nome) {
        const sql = `insert into Cliente (nome) values ($1)`;
        const values = [nome];
    
        pool.query(sql, values);
    }
    
    pool.end();

    res.redirect("/");
});


// Inicializa o servidor na porta 8080 (variável), e trata um possível erro
app.listen(8080, function(error) {
    if(error) {
        console.log("O servidor não foi inicialiado corretamente.");
    } else {
        console.log("O servidor está em execução.")
    }
});