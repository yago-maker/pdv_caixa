const express = require('express');
const rotas = express();

rotas.get('/', async (request, response) => {
	response.status(200).json('Funcionando');
})


module.exports = rotas