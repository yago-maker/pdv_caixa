const knex = require('../../../config/conexaoDB');
const schemaProduto = require('../../../valida/validarProduto');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        // Verificar se a categoria existe
        const categoriaExiste = await knex.select('id').from('categorias').where({ id: categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' });
        }

        // Inserir o novo produto
        const novoProduto = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');

        return res.status(201).json(novoProduto);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = cadastrarProduto;