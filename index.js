const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

app.get('/api/precos', (req, res) => {
  const dataPath = path.join(__dirname, 'db.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o arquivo' });
    }
    res.json(JSON.parse(data));
  });
});


app.post('/api/precos', express.json(), (req, res) => {
  const { produto, preco } = req.body;

  // Aqui você pode adicionar lógica para salvar o novo produto no seu arquivo JSON ou banco de dados
  // Por exemplo, você pode ler o arquivo JSON, adicionar o novo produto ao array e depois salvar novamente o arquivo

  const dataPath = path.join(__dirname, 'db.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o arquivo' });
    }

    const products = JSON.parse(data);
    const newProduct = {
      id: products.length + 1, // Exemplo simples de atribuir um ID
      produto: produto,
      preco: preco
    };

    products.push(newProduct); // Adiciona o novo produto ao array

    // Salva os produtos atualizados de volta no arquivo JSON
    fs.writeFile(dataPath, JSON.stringify(products), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar o produto' });
      }
      res.status(201).json(newProduct); // Retorna o novo produto criado com status 201 (Created)
    });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})