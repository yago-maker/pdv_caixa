const joi = require("joi");

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'string.empty': 'O campo nome não pode estar vazio.'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido.',
    }),
    cpf: joi.string().required().length(11).messages({
        'string.length': 'O campo CPF deve ter exatamente 11 caracteres.',
        'string.empty': 'O campo nome não pode estar vazio.'
    }),
    cep: joi.string(),
    rua: joi.string(),
    numero: joi.number().positive(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string().length(2).messages({
        'string.length': 'O campo CPF deve ter exatamente 2 caracteres.'
    })

})
    .and('nome', 'email', 'cpf')
    .messages({
        'any.required': 'Campos obrigatórios (nome, email, cpf) devem ser fornecidos.',
        'string.base': 'Os campos precisam estar em formato válido.',
        'string.empty': 'Nenhum campo pode estar vazio.',
        'string.email': 'Email precisa estar em formato válido'
    });
module.exports = schemaCliente;