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
    res.render('banca/banca');
});

app.get("/compras", function(req, res) {
    res.render('compras/compras');
});

app.get("/notasfiscais", function(req, res) {
    res.render('notasfiscais/notasfiscais');
});

// Cria uma rota que irá coletar os dados do formulário de cadastro de cliente
app.post("/realizarCadastro", (req, res) => {
    var tabela = req.body.tabela;
    const pool = new Pool(credentials);
    
    if(tabela == 'cliente') {
        var nome = req.body.nome;
        if(nome) {
            const sql = `insert into cliente (nome) values ($1)`;
            const values = [nome];
        
            pool.query(sql, values);
        }
    } else if(tabela == 'gerente') {
        var nome = req.body.nome;
        if(nome) {
            const sql = `insert into gerente (nome) values ($1)`;
            const values = [nome];
        
            pool.query(sql, values);
        }
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