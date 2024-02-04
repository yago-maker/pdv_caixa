const joi = require('joi');

const schemaPedido = joi.object({
    cliente_id: joi.number().integer().required(),
    observacao: joi.string().allow(''),
    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: joi.number().integer().required(),
            quantidade_produto: joi.number().integer().min(1).required(),
        })
    ).required(),
});


module.exports = schemaPedido;