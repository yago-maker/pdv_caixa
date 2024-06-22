const joi = require("joi");

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        "any.required": "O campo descricao é obrigatório",
        "string.empty": "O campo descricao não pode estar vazio",
    }),
    quantidade_estoque: joi.number().integer().required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório",
        'number.negative': 'O campo quantidade_estoque não pode ser negativo.'
    }),
    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.negative': 'O campo valor não pode ser negativo.'
    }),
    categoria_id: joi.number().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.negative': 'O campo categoria_id não pode ser negativo.'
    })
});



module.exports = schemaProduto;
