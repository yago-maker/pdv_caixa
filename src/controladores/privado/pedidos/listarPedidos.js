const knex = require('../../../config/conexaoDB');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        let query = knex
            .select('pedidos.id as pedido_id', 'valor_total', 'observacao', 'cliente_id')
            .from('pedidos');

        if (cliente_id) {

            query.where('cliente_id', cliente_id);
        }

        const pedidosResultado = await query;

        const pedidos = [];

        for (const pedidoRow of pedidosResultado) {
            const pedidoProdutosResultado = await knex
                .select('id', 'quantidade_produto', 'valor_produto', 'pedido_id', 'produto_id')
                .from('pedido_produtos')
                .where('pedido_id', pedidoRow.pedido_id);

            const pedido = {
                id: pedidoRow.pedido_id,
                valor_total: pedidoRow.valor_total,
                observacao: pedidoRow.observacao,
                cliente_id: pedidoRow.cliente_id,
            };

            pedidos.push({
                pedido,
                pedido_produtos: pedidoProdutosResultado
            });
        }

        res.status(200).json(pedidos);

    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
module.exports = listarPedidos;