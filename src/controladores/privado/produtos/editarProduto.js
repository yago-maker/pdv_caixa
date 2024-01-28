const knex = require('../../../config/conexaoDB');
const joi = require("joi");

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
    
        // Verificar se o produto existe
        const produtoExistente = await knex.select('id').from('produtos').where({ id }).first();

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: 'O produto informado não existe.' });
        }

        // Verificar se a categoria existe
        const categoriaExiste = await knex.select('id').from('categorias').where({ id: categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' });
        }

        // Atualizar o produto
        const produtoAtualizado = await knex('produtos')
            .where({ id })
            .update({ descricao, quantidade_estoque, valor, categoria_id })
            .returning('*');

        return res.status(200).json(produtoAtualizado);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = editarProduto;