const { notFoundMsg, internServerErrorMsg } = require('../../../alerts/alerts')
const knex = require('../../../config/conexaoDB')

const getClient = async (req, res) => {

    try {
        const { id } = req.params

        const clienteIdExiste = await knex('clientes').where({ id }).first().returning('*')

        if (!clienteIdExiste) {
            return res.status(400).json({message: notFoundMsg()})
        }
        return res.status(200).json(clienteIdExiste)

    } catch (error) {
        return res.status(500).json({menssagem: internServerErrorMsg()})
    }
}

module.exports = getClient;