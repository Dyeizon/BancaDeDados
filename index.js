const express = require('express');
const bodyParser = require('body-parser');

const clientesController = require('./clientes/ClientesController');
const gerentesController = require('./gerentes/GerentesController');
const bancaController = require('./banca/BancaController');
const cadastrarController = require('./operacoes/CadastrarController');
const atualizarController = require('./operacoes/AtualizarController');

// Cria uma aplicação Express
const app = express();

// Define que o mecanismo de renderização das páginas HTML será o EJS
app.set('view engine', 'ejs');

// Define o diretório dos arquivos estáticos (CSS, IMG...)
app.use(express.static('public'));

// Define que a aplicação utilizará o BodyParser para tratar as informações vindas de um formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cria uma rota para a página inicial
app.get("/", function(req, res) {
    res.render('index');
});

// Importação das rotas
app.use("/", clientesController);
app.use("/", gerentesController);
app.use("/", bancaController);
app.use("/", cadastrarController);
app.use("/", atualizarController);

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

app.get("/compras", function(req, res) {
    res.render('compras/compras');
});

app.get("/notasfiscais", function(req, res) {
    res.render('notasfiscais/notasfiscais');
});

// Inicializa o servidor na porta 80 (padrão da web), e trata um possível erro
app.listen(80, function(error) {
    if(error) {
        console.log("O servidor não foi inicialiado corretamente.");
    } else {
        console.log("O servidor está em execução.")
    }
});