const knex = require('../../../config/conexaoDB')

const exclusaoDoProduto = async (req, res) => {
    const { id } = req.params
    try {

        const produtoExiste = await knex('produtos').where({ id }).first()

        if (!produtoExiste) {
            return res.status(400).json({ message: "O produto não existe." })
        }

        const pedidoProdutoExiste = await knex('pedido_produtos').where({ produto_id: id }).first()

        if (pedidoProdutoExiste) {
            return res.status(404).json({ message: "O produto está registrado em um pedido e nao pode ser excluido." })
        }

        const excluirProduto = await knex('produtos').where({ id }).del();

        return res.status(200).json({ message: "Produto excluído com sucesso!" })

    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }

}

module.exports = exclusaoDoProduto