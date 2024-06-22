const Joi = require("joi");

const schemaUsuario = Joi.object({
    nome: Joi.string().trim().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome não pode estar vazio",
    }),

    email: Joi.string().email().required().messages({
        "string.email": "O campo email precisa ter um formato válido",
        "any.required": "O campo email é obrigatório",
        "string.empty": "O campo email não pode estar vazio",
    }),

    senha: Joi.string().required().messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha não pode estar vazio",
    }),
});

module.exports = schemaUsuario;
