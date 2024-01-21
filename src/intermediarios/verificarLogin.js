const knex = require('../config/conexaoDB')
const jwt = require('jsonwebtoken')
const senhaJwt = process.env.JWTPASS

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não está autorizado' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);

        const usuario = await knex('usuarios').where('id', id).first();

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Não está autorizado' });
        }

        delete usuario.senha;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não está autorizado' });
    }
};


module.exports = verificaLogin