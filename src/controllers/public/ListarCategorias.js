const knex = require('../bancodedados/conexao');
const listarCategorias = async (req, res) => {
    try {
        const listarCategorias = await knex('categorias')
        res.json(listarCategorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar a tabela.' });
    }

}

module.exports = {
    listarCategorias
}