const knex = require('../../../config/conexaoDB');

const listarClientes = async (request, response ) => {
    try {
        const clientes = await knex.select('*').from('clientes');
        return response.status(200).json(clientes);
    } catch (error) {
        return response.status(500).json(error)
    }
}

module.exports = listarClientes;