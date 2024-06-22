const knex = require('../../../config/conexaoDB');
const { internServerErrorMsg } = require('../../../alerts/alerts');

const listAllClients = async (req, res ) => {
    try {
        
        const clientes = await knex.select('*').from('clientes');
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({mensagem: internServerErrorMsg()})
    }
}

module.exports = listAllClients;