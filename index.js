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

  if (!produto || !preco) {
    return res.status(400).json({ error: 'Dados incompletos. Certifique-se de enviar produto e preço.' });
  }

  const dataPath = path.join(__dirname, 'db.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ error: 'Erro ao ler o arquivo de dados.' });
    }

    try {
      const products = JSON.parse(data);
      const newProduct = {
        id: products.length + 1,
        produto: produto,
        preco: preco
      };

      products.push(newProduct);

      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        if (err) {
          console.error('Erro ao salvar o produto:', err);
          return res.status(500).json({ error: 'Erro ao salvar o produto.' });
        }
        res.status(201).json(newProduct); // Retorna o novo produto com status 201 (Created)
      });
    } catch (error) {
      console.error('Erro ao processar dados JSON:', error);
      res.status(500).json({ error: 'Erro interno ao processar dados JSON.' });
    }
  });
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})