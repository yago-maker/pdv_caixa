const knex = require('../../../config/conexaoDB')

const detalharCliente = async (req, res) => {

    try {
        const { id } = req.params

        const clienteIdExiste = await knex('clientes').where({ id }).first().returning('*')

        if (!clienteIdExiste) {
            return res.status(400).json("Cliente não cadastrado.")
        }
        return res.status(200).json(clienteIdExiste)

    } catch (error) {
        return res.status(500).json("Erro interno do servidor.")
    }
}

module.exports = detalharCliente 