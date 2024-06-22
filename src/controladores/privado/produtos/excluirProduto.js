// Importa o Knex.js configurado para conectar ao PostgreSQL
const knex = require('../../../config/conexaoDB');
const joi = require('joi');
const {
    notFoundMsg,
    internServerErrorMsg,
} = require('../../../alerts/alerts');

// Função assíncrona para excluir um produto do banco de dados
const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        // Validação do ID usando Joi
        const schema = joi.object({
            id: joi.number().required()
        });

        const { error } = schema.validate({ id });
        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }

        // Verifica se o produto existe no banco de dados
        const produtoExistente = await knex('produtos').where({ id }).first();
        if (!produtoExistente) {
            return res.status(404).json({ mensagem: notFoundMsg() });
        }

        // Verifica se o produto está associado a algum pedido
        const pedidoProdutoExiste = await knex('pedido_produtos').where({ produto_id: id }).first();
        if (pedidoProdutoExiste) {
            return res.status(400).json({ erro: 'O produto está associado a um pedido e não pode ser excluído.' });
        }

        // Exclui o produto do banco de dados
        await knex('produtos').where({ id }).del();

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });

    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return res.status(500).json({  mensagem: internServerErrorMsg() });
    }
};

module.exports = excluirProduto;
