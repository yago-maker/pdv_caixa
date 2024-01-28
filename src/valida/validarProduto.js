const joi = require("joi");

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        "any.required": "O campo descricao é obrigatório",
        "string.empty": "O campo descricao não pode estar vazio",
    }),
    quantidade_estoque: joi.number().integer().required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório",
        "number.integer": "O campo quantidade_estoque deve ser um número inteiro",
    }),
    valor: joi.number().required().messages({
        "any.required": "O campo valor é obrigatório",
    }),
    categoria_id: joi.number().integer().required().messages({
        "any.required": "O campo categoria_id é obrigatório",
        "number.integer": "O campo categoria_id deve ser um número inteiro",
    }),
});



module.exports = schemaProduto;
