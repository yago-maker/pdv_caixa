const express = require('express');
const rotas = express();

const multer = require('../config/multer');

//Controladores
const listarCategoria = require('../controladores/publico/listarCategorias')

const cadastrar = require('../controladores/publico/cadastroDeUsuario')
const login = require('../controladores/publico/login')
const listarUsuario = require('../controladores/privado/usuario/listarUsuario');
const atualizarUsuario = require('../controladores/privado/usuario/editarUsuarios');

const cadastrarProduto = require('../controladores/privado/produtos/cadastroProduto')
const editarProduto = require('../controladores/privado/produtos/editarProduto')
const excluirProduto = require('../controladores/privado/produtos/excluirProduto');
const listarProdutos = require('../controladores/privado/produtos/listarProdutos');
const detalharProduto = require('../controladores/privado/produtos/detalharProduto')

const validarPedido = require('../valida/validarPedido')

const cadastrarPedido = require('../pedido/cadastraPedido')

const cadastrarCliente = require('../../src/controladores/privado/clientes/cadastroDeCliente')
const editarCliente = require('../../src/controladores/privado/clientes/editarDadosDoCliente')
const listarClientes = require('../controladores/privado/clientes/listarCliente');
const detalharCliente = require('../controladores/privado/clientes/detalharCliente');

// pedidos
const listarPedidos = require('../controladores/privado/pedidos/listarPedidos');

//intermediario
const verificarLogin = require('../intermediarios/verificarLogin');

//joi
const schemaUsuario = require('../../src/valida/validaUsuario');
const schemaLogin = require('../../src/valida/validalogin');
const schemaProduto = require('../valida/validarProduto');
const validarRequisicao = require('../intermediarios/validarRequisicao');
const schemaCliente = require('../valida/validarCliente');
const verificaLogin = require('../intermediarios/verificarLogin');
const schemaPedido = require('../valida/validarPedido')


rotas.get('/listarCategorias', listarCategoria);

rotas.post('/usuarios', validarRequisicao(schemaUsuario), cadastrar);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.use(verificaLogin);

rotas.get('/usuario', verificarLogin, listarUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), atualizarUsuario);


rotas.get('/produtos', listarProdutos);
rotas.post('/produto', multer.single('imagem_produto') ,validarRequisicao(schemaProduto), cadastrarProduto);
rotas.put('/produto/:id', validarRequisicao(schemaProduto), editarProduto);
rotas.delete('/produto/:id', excluirProduto);
rotas.get('/produto/:id', detalharProduto)


rotas.post('/cliente', validarRequisicao(schemaCliente), cadastrarCliente)
rotas.put('/cliente/:id', validarRequisicao(schemaCliente), editarCliente);
rotas.get('/cliente/:id', detalharCliente)
rotas.get('/cliente', listarClientes)

rotas.post('/pedido', validarRequisicao(schemaPedido), cadastrarPedido);
rotas.get('/pedido', listarPedidos)

module.exports = rotas;

