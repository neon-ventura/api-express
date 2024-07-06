const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const produtos = require('./db.json')
const port = process.env.PORT || 3000


app.use(cors())


app.get('/api/precos', (req, res) => {
  return res.json(produtos);
});

app.post('/api/precos', (req, res) => {

  const novoProduto = {
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    produto: req.body.produto,
    preco: req.body.preco
  };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})