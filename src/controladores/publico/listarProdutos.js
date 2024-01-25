const knex = require('../../config/conexaoDB')


const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;
  
    try {
      let query = knex('produtos');
  
      if (categoria_id) {
        
        query = query.where('categoria_id', categoria_id);
  
        const categoriaExist = await knex('categorias').where('id', categoria_id).first();
  
        if (!categoriaExist) {
          return res.status(400).json({ message: 'A categoria informada não existe' });
        }
      }

      const result = await query.select('*');
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }}

  module.exports = listarProdutos;
  