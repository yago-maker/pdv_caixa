const express = require('express');
const rotas = express();
const atualizarUsuario = require('./../../src/controllers/Public/editarUsuarios');
const verificaLogin = require('./../../src/intermediarios/verificarLogin');
const knex = require('../config/conexaoDB');
const listarCategoria = require('../componentes/listarCategorias');

rotas.get('/categorias', listarCategoria);

rotas.put("/usuario", verificaLogin, atualizarUsuario);

module.exports = rotas;
