const express = require('express');
const { cadastrarUsuario, loginDoUsuario, detalharPerfil, editaPerfil } = require('./controladores/usuarios');
const verificaLogin = require('./intermediarios/vericaLogin');
const { listarCategorias } = require('./controladores/categorias');

const rotas = express();

// Cadastro de Usuário
rotas.post('/usuario', cadastrarUsuario);

// Login de Usuário
rotas.post('/login', loginDoUsuario);

// Intermediário de Validação de Login
rotas.use(verificaLogin);



module.exports = rotas;