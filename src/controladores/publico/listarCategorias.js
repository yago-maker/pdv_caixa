const knex = require('../../config/conexaoDB');

const listarCategoria = async (req, res) => {
  try {
    const categorias = await knex.select().from('categorias');
    console.log(categorias);

    if (categorias.length <= 0) {
        return res.status(404).json({ mensagem: 'Nenhuma categoria encontrada.' });
    }

    return res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno no Servidor'});
  }
};

module.exports = listarCategoria;
