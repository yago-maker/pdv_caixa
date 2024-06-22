const knex = require('../../../config/conexaoDB');
const sendEmailClient = require('./enviarEmail');
const { internServerErrorMsg } = require('../../../alerts/alerts');

const orderRegister = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const clienteExiste = await knex('clientes').select('id', 'nome').where('id', cliente_id).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado." });
        }

        const valores = [];
        for (const item of pedido_produtos) {
            const produtoExistente = await knex('produtos').select('id', 'quantidade_estoque', 'valor').where({ id: item.produto_id }).first();

            if (!produtoExistente) {
                return res.status(404).json({ mensagem: `Produto com ID ${item.produto_id} não encontrado.` });
            }

            if (item.quantidade_produto > produtoExistente.quantidade_estoque) {
                return res.status(400).json({ mensagem: `Quantidade insuficiente em estoque para o produto com ID ${produtoExistente.id}.` });
            }

            valores.push(produtoExistente.valor);
        }

        let valor_total = 0;
        for (let i = 0; i < pedido_produtos.length; i++) {
            valor_total += pedido_produtos[i].quantidade_produto * valores[i];
        }

        const [pedido_id] = await knex('pedidos').insert({
            cliente_id,
            observacao: observacao || '',
            valor_total
        }).returning('id');

        for (let i = 0; i < pedido_produtos.length; i++) {
            await knex('pedido_produtos').insert({
                pedido_id: pedido_id.id, // Certifique-se de que 'pedido_id' seja correto
                produto_id: pedido_produtos[i].produto_id,
                quantidade_produto: pedido_produtos[i].quantidade_produto,
                valor_produto: valores[i]
            });
        }

        for (const item of pedido_produtos) {
            await knex('produtos').where({ id: item.produto_id }).decrement('quantidade_estoque', item.quantidade_produto);
        }

        sendEmailClient(clienteExiste.nome, pedido_id.id);

        return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: internServerErrorMsg });
    }
};

module.exports = orderRegister;
