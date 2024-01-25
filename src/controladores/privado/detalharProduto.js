const knex = require('../../config/conexaoDB')

const detalharProduto = async (req, res) => {

    try {
        const { id } = req.params

        const produtoIdExiste = await knex('produtos').where({ id }).first().returning('*')

        if (!produtoIdExiste) {
            return res.status(400).json("Produto não cadastrado.")
        }
        return res.status(200).json(produtoIdExiste)

    } catch (error) {
        return res.status(500).json("Erro interno do servidor.")
    }
}

module.exports = detalharProduto