const knex = require('../../config/conexaoDB');
const joi = require("joi");

const excluirProduto = async (req, res) => {
    try {
        const { id } = req.body;

        //validação do ID utilizando Joi:
        const schema = joi.object({
            id: joi.number().required()
        });

        const validation = schema.validate({ id });

        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }

        //realiza a exclusão do produto no banco de dados
        await knex('produtos').where({ id }).del();

        return res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao excluir o produto' });
    }
};

module.exports = { excluirProduto };
