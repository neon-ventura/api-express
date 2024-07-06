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


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})