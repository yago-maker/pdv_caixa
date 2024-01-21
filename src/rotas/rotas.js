const express = require('express');
const rotas = express();
const atualizarUsuario = require('./../../src/controllers/Public/editarUsuarios');
const verificaLogin = require('./../../src/intermediarios/verificarLogin');
const knex = require('../config/conexaoDB');
const listarCategoria = require('../componentes/listarCategorias');
const cadastrarUsuario = require('../controllers/public/cadastroDeUsuario')
rotas.get('/categorias', listarCategoria);


rotas.post('/usuario', cadastrarUsuario)

rotas.put("/usuario", verificaLogin, atualizarUsuario);


module.exports = rotas;
