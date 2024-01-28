const express = require('express');
const rotas = express();

//Controladores
const listarCategoria = require('../controladores/publico/listarCategorias')
const cadastrar = require('../controladores/publico/cadastroDeUsuario')
const login = require('../controladores/publico/login')

const cadastrarProduto = require('../controladores/privado/produtos/cadastroProduto')
const editarProduto = require('../controladores/privado/produtos/editarProduto')
const excluirProduto = require('../controladores/privado/produtos/excluirProduto');

const listarUsuario = require('../controladores/privado/usuario/listarUsuario');
const atualizarUsuario = require('../controladores/privado/usuario/editarUsuarios');


const listarProdutos = require('../controladores/privado/produtos/listarProdutos');
const listarClientes = require('../controladores/privado/clientes/listarCliente');

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

rotas.get('/usuario', verificarLogin, listarUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), verificarLogin, atualizarUsuario);

rotas.get('/produtos', listarProdutos);
rotas.post('/produto', validarRequisicao(schemaProduto), cadastrarProduto);
rotas.put('/produto/:id', validarRequisicao(schemaProduto), editarProduto);
rotas.delete('/produto/:id', excluirProduto);



rotas.get('/listarCliente', verificarLogin, listarClientes)




module.exports = rotas;

