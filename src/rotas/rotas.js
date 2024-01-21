const express = require('express');
const rotas = express();
const knex = require('../config/conexaoDB');
const listarCategoria = require('../componentes/listarCategorias');

rotas.get('/categorias', listarCategoria);

module.exports = rotas;
