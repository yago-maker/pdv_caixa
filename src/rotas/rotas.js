const express = require('express');
const { cadastrarUsuario } = require('../controladores/usuarios');
const rotas = express();

rotas.get('/', async (request, response) => {
	response.status(200).json('Funcionando');
})

rotas.post('/usuarios', cadastrarUsuario)


module.exports = rotas