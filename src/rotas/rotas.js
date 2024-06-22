const express = require('express');
const rotas = express(); // Criando uma instância do Express para rotas

const multer = require('../config/multer'); // Importando configuração do multer para upload de arquivos

// Importando controladores
const listarCategoria = require('../controladores/publico/listarCategorias');
// Usuarios
const registerUser = require('../controladores/publico/cadastroDeUsuario');
const login = require('../controladores/publico/login');
const getUser = require('../controladores/privado/usuario/listarUsuario');
const atualizarUsuario = require('../controladores/privado/usuario/editarUsuarios');
// Produto
const cadastrarProduto = require('../controladores/privado/produtos/cadastroProduto');
const updateProducts= require('../controladores/privado/produtos/editarProduto');
const excluirProduto = require('../controladores/privado/produtos/excluirProduto');
const listarProdutos = require('../controladores/privado/produtos/listarProdutos');
const detalharProduto = require('../controladores/privado/produtos/detalharProduto');

// Cliente
const registerClient = require('../controladores/privado/clientes/cadastroDeCliente');
const updateClient = require('../controladores/privado/clientes/editarDadosDoCliente');
const listAllClients = require('../controladores/privado/clientes/listarCliente');
const getClient = require('../controladores/privado/clientes/detalharCliente');

//pedidos
const listOrder = require('../controladores/privado/pedidos/listarPedidos');
const orderRegister = require('../controladores/privado/pedidos/cadastraPedido');


// Importando validadores Joi
const schemaUsuario = require('../../src/valida/validaUsuario');
const schemaLogin = require('../../src/valida/validalogin');
const schemaProduto = require('../valida/validarProduto');
const schemaCliente = require('../valida/validarCliente');
const schemaPedido = require('../valida/validarPedido');

// Importando intermediários e validações
const validarRequisicao = require('../intermediarios/validarRequisicao');
const verificarLogin = require('../intermediarios/verificarLogin');


// Definição das rotas
rotas.get('/listarCategorias', listarCategoria);

rotas.post('/usuarios', validarRequisicao(schemaUsuario), registerUser);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.use(verificarLogin); // Middleware para verificar login em todas as rotas abaixo desta linha

rotas.get('/usuario', getUser);
rotas.put('/usuario', validarRequisicao(schemaUsuario), atualizarUsuario);

rotas.get('/produtos', listarProdutos);
rotas.post('/produto', multer.single('imagem_produto'), validarRequisicao(schemaProduto), cadastrarProduto);
rotas.put('/produto/:id', validarRequisicao(schemaProduto), updateProducts);
rotas.delete('/produto/:id', excluirProduto);
rotas.get('/produto/:id', detalharProduto);

rotas.post('/cliente', validarRequisicao(schemaCliente), registerClient);
rotas.put('/cliente/:id', validarRequisicao(schemaCliente), updateClient);
rotas.get('/cliente/:id', getClient);
rotas.get('/cliente', listAllClients);

rotas.post('/pedido', validarRequisicao(schemaPedido), orderRegister);
rotas.get('/pedido', listOrder);

module.exports = rotas;
