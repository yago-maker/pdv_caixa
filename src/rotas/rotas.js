const express = require('express');
const rotas = express();

rotas.get('/', async (request, response) => {
	response.status(200).json('Funcionando');
})

const cadastrarUsuario = require('../controllers/public/cadastroDeUsuario')


rotas.post('/usuario', cadastrarUsuario)

module.exports = rotas