const express = require('express');
const rotas = express();
const listarCategoria = require('../componentes/listarCategorias')




rotas.get('/categorias', listarCategoria)


module.exports = rotas