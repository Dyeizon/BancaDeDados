// Importa o Express
const express = require('express');

// Importa o EJS
const ejs = require('ejs');

// Cria uma aplicação Express
const app = express();

// Define que o mecanismo de renderização das páginas HTML será o EJS
app.set('view engine', 'ejs');

// Define o diretório dos arquivos estáticos (CSS, IMG...)
app.use(express.static('public'));

// Cria uma rota para a página inicial '/'
app.get("/", function(req, res) {
    res.render('index');
});

// Cria uma rota que irá coletar os dados do formulário de cadastro de cliente
app.post("/cadastrarCliente", (req, res) => {
    res.send("Formulário recebido");
})








// Inicializa o servidor na porta 8080 (variável), e trata um possível erro
app.listen(8080, function(error) {
    if(error) {
        console.log("O servidor não foi inicialiado corretamente.");
    } else {
        console.log("O servidor está em execução.")
    }
});