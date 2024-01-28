const knex = require('../../../config/conexaoDB');
const joi = require("joi");

const excluirProduto = async (req, res) => {
    const id = req.params.id;
    try {

        //realiza a exclusão do produto no banco de dados
        const produto = await knex('produtos').where({id}).del();

        return res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir o produto' });
    }
};

module.exports = excluirProduto;
