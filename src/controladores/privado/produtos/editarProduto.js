const knex = require('../../../config/conexaoDB');
const {
    notFoundMsg,
    successEditMsg,
    internServerErrorMsg
} = require('../../../alerts/alerts');

const updateProducts = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
    const { id } = req.params;

    try {
        const productExists = await knex('produtos').where({ id }).first();

        if (!productExists) {
            return res.status(400).json({ message: `Product ${notFoundMsg()}` });
        }

        if (categoria_id) {
            const categorieExists = await knex('categorias').where({ id: categoria_id }).first();

            if (!categorieExists) {
                return res.status(400).json({ message: `Category ${notFoundMsg()}` })
            }
        }

        if(produto_imagem) {
            const image = await updloadFile(
                produto_imagem.filename,
                produto_imagem.buffer,
                produto_imagem.mimetype
            )

            await knex('produtos')
            .where({ id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: image.url
            });

        } else {
        await knex('produtos')
            .where({ id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            });
        }
        return res.status(200).json({ message: successEditMsg() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: internServerErrorMsg() });
    }
}

module.exports = updateProducts;