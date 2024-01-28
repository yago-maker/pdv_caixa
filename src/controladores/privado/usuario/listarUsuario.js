const knex = require('../../../config/conexaoDB')

const listarUsuario = async (request, response) => {
    const { id } = request.usuario;

    try {
        const usuario = await knex.select('*').from('usuarios').where('id', id);

        return response.status(200).json(usuario);
    } catch (error) {
        return response.status(500).json(error);
    }

}

module.exports = listarUsuario;