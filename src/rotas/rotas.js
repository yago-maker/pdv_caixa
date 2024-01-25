const express = require('express');
const rotas = express();

//Controladores
const listarCategoria = require('../controladores/publico/listarCategorias')
const cadastrar = require('../controladores/publico/cadastroDeUsuario')
const login = require('../controladores/publico/login')

const listarUsuario = require('../controladores/privado/listarUsuario');
const atualizarUsuario = require('../controladores/privado/editarUsuarios');
const editarDadosDoUsuario = require('../controladores/privado/editarDadosDoCliente');

//intermediario
const verificarLogin = require('../intermediarios/verificarLogin');

//joi
const schemaUsuario = require('../../src/valida/validaUsuario');
const schemaLogin = require('../../src/valida/validalogin');
const validarRequisicao = require('../intermediarios/validarRequisicao');
const schemaCliente = require('../valida/validarCliente');


rotas.get('/listarCategorias', listarCategoria);
rotas.post('/usuarios', validarRequisicao(schemaUsuario), cadastrar);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.get('/usuario', verificarLogin, listarUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), verificarLogin, atualizarUsuario);

rotas.put('/cliente/:id', validarRequisicao(schemaCliente), verificarLogin, editarDadosDoUsuario);


module.exports = rotas;

