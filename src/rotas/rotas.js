const express = require('express');
const { cadastrarUsuario, login } = require('../controladores/usuarios');
const verificaLogin = require('../intermediarios/verificaLogin');
const rotas = express();

rotas.get('/', async (request, response) => {
	response.status(200).json('Funcionando');
})

rotas.post('/usuarios', cadastrarUsuario)
rotas.post('/login', login)



module.exports = rotas