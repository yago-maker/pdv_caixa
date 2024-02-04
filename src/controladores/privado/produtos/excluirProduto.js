const knex = require('../../../config/conexaoDB');
const joi = require("joi");

const excluirProduto = async (req, res) => {
    try {
        const { id } = req.body

        const schema = joi.object({
            id: joi.number().require()
        });

        const validacao = schema.validate({ id });

        if (validacao.error) {
            return res.status(400).json({ erro: validacao.error.details[0].message });
        }

        //realiza a verificação do produto antes da exclusão
        const produtoExistente = await knex('produtos').where({ id }).first();

        if (!produtoExistente) {
            return res.status(400).json({ erro: 'Produto não encontrado!' })
        }

        //realiza a exclusão do produto no bd
        await knex('produtos').where({ id }).del();

        return res.status(200).json({ messagem: 'Produto excluido com sucesso!' })

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir o produto' });
    }
};

module.exports = excluirProduto;
