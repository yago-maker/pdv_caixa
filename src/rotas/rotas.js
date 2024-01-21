const express = require('express');
const rotas = express();

//Controladores
const listarCategoria = require('../controladores/publico/listarCategorias')
const cadastrar = require('../controladores/publico/cadastroDeUsuario')
const login = require('../controladores/publico/login')

const listarUsuario = require('../controladores/privado/listarUsuario');
const atualizarUsuario = require('../controladores/privado/editarUsuarios');

//intermediario
const verificarLogin = require('../intermediarios/verificarLogin');

//joi
const schemaUsuario = require('../../src/valida/validaUsuario');
const schemaLogin = require('../../src/valida/validalogin');

rotas.get('/listarCategorias', listarCategoria);
rotas.post('/usuarios', cadastrar);
rotas.post('/login', login);

rotas.get('/usuario', verificarLogin, listarUsuario);
rotas.put('/usuario', verificarLogin, atualizarUsuario);

module.exports = rotas;

