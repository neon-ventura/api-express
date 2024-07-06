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


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})