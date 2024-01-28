const express = require('express');
const rotas = express();

//Controladores
const listarCategoria = require('../controladores/publico/listarCategorias')
const cadastrar = require('../controladores/publico/cadastroDeUsuario')
const login = require('../controladores/publico/login')

const cadastrarProduto = require('../controladores/publico/cadastroProduto')
const editarProduto = require('../controladores/publico/editarProduto')

const listarUsuario = require('../controladores/privado/listarUsuario');
const atualizarUsuario = require('../controladores/privado/editarUsuarios');


const listarProdutos = require('../controladores/publico/listarProdutos');
const listarClientes = require('../controladores/privado/listarCliente');

//intermediario
const verificarLogin = require('../intermediarios/verificarLogin');

//joi
const schemaUsuario = require('../../src/valida/validaUsuario');
const schemaLogin = require('../../src/valida/validalogin');
const schemaProduto = require('../valida/validarProduto');
const validarRequisicao = require('../intermediarios/validarRequisicao');


rotas.get('/listarCategorias', listarCategoria);
rotas.post('/usuarios', validarRequisicao(schemaUsuario), cadastrar);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.post('/produto',validarRequisicao(schemaProduto), cadastrarProduto);
rotas.put('/produto/:id', validarRequisicao(schemaProduto), editarProduto);

rotas.get('/usuario', verificarLogin, listarUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), verificarLogin, atualizarUsuario);


rotas.get('/listarCliente', verificarLogin, listarClientes)


rotas.get('/produto', listarProdutos);

module.exports = rotas;

