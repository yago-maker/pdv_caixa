const express = require('express');
const { cadastrarUsuario, loginDoUsuario, detalharPerfil, editaPerfil } = require('./controladores/usuarios');
const verificaLogin = require('./intermediarios/vericaLogin');
const { listarCategorias } = require('./controladores/categorias');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);

rotas.post('/login', loginDoUsuario);

rotas.use(verificaLogin);



module.exports = rotas;