const express = require('express')
const app = express()
const cors = require('cors')
const produtos = require('./db.json')
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())


app.get('/api/precos', (req, res) => {
  return res.json(produtos);
});

app.get('/api/precos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const produto = produtos.find(p => p.id === id)
  res.json(produto)
})

app.post('/api/precos', (req, res) => {

  const novoProduto = {
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    produto: req.body.produto,
    preco: req.body.preco
  };
  produtos.push(novoProduto);

  res.json(novoProduto);
});

app.delete('/api/precos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const produtoIndex = produtos.findIndex(produtos => produtos.id === id)
  if (produtoIndex > -1) {
    produtos.splice(produtoIndex, 1)
  }
  res.send({message: 'Produto deletado com sucesso' })
})


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})