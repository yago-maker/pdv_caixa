const knex = require('../../../config/conexaoDB');
const s3 = require('../../../config/imagemDB')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req

    try {
        // Verificar se a categoria existe
        const categoriaExiste = await knex.select('id').from('categorias').where({ id: categoria_id }).first();

        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' });
        }

        // Upload da imagem
        const uploadImagem = await s3.upload({
            Bucket: process.env.BB_KEY_NAME,
            Key: descricao,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise()
        console.log(uploadImagem)

        const produto_imagem = uploadImagem.Location

        // Inserir o novo produto
        const novoProduto = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: produto_imagem }).returning('*');

        return res.status(201).json(novoProduto);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = cadastrarProduto;