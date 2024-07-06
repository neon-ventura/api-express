const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Função para ler o conteúdo do arquivo db.json
const lerDB = () => {
  try {
    const dados = fs.readFileSync('db.json', 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    console.error('Erro ao ler o arquivo db.json:', err);
    return [];
  }
};

// Função para escrever dados no arquivo db.json
const escreverDB = (dados) => {
  try {
    fs.writeFileSync('db.json', JSON.stringify(dados, null, 2));
  } catch (err) {
    console.error('Erro ao escrever no arquivo db.json:', err);
  }
};

// Rota GET para obter todos os produtos
app.get('/api/precos', (req, res) => {
  const produtos = lerDB();
  res.json(produtos);
});

// Rota POST para adicionar um novo produto
app.post('/api/precos', (req, res) => {
  const produtos = lerDB();
  const novoProduto = {
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    produto: req.body.produto,
    preco: req.body.preco
  };
  produtos.push(novoProduto);
  escreverDB(produtos);
  res.status(201).json(novoProduto);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});