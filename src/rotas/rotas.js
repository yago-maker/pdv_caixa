const express = require('express');
const rotas = express();
const { atualizarUsuario,} = require('./../../src/controllers/Public/editarUsuarios');

const verificaLogin = require('./../../src/intermediarios/verificaLogin');

rotas.get('/', async (request, response) => {
	response.status(200).json('Funcionando');
})

app.put("/usuario", verificaLogin, atualizarUsuario);

module.exports = rotas