require('dotenv').config();
const express = require('express');
const app = express();
const rotas = require('./src/rotas/rotas');

app.use(express.json());
app.use(rotas);

app.listen(process.env.PORT, () => {
	console.log('Back-End está ativo!')
});

