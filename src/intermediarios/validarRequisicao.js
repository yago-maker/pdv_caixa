const usuarioSchema = require('../valida/validaUsuario')

const validarRequisicao = (schema) => async (req, res, next) => {

    try {
        await schema.validateAsync(req.body)
        next()

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = validarRequisicao;