const knex = require('../../../config/conexaoDB');
const { notFoundMsg } = require('../../../alerts/alerts')

const listOrder = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        if (cliente_id) {

            const clientExist = await knex("clientes").where({ id: cliente_id });

            if (!clientExist) return res.status(404).json({ message: notFoundMsg() });

            const order_Client = await knex("pedidos").where({ cliente_id });

            const searchOrder = await knex("pedido_produtos").where({ pedido_id: order_Client.id });

            return res.status(200).json({ order_Client, searchOrder });
        }

        const allOrder_Client = await knex("pedidos");

        return res.status(200).json(allOrder_Client);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: notFoundMsg() });
    }
}

module.exports = listOrder;