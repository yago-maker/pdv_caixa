const knex = require('../../config/conexaoDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJWT = process.env.JWTPASS

const login = async (req, res) => {
    const { email, senha } = req.body;
    

    // if (!email || !senha) {
    //     return res.status(404).json('É obrigatório email e senha')
    // }
    
    try {
        const usuario = await knex.select().from('usuarios').where({email: email}).first()
        if (!usuario) {
            return res.status(404).json('O usuario não foi encontrado')
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        
        if (!senhaCorreta) {
            return res.status(404).json('Email ou senha não confere')
        }
        
        const token = jwt.sign({ id: usuario.id }, senhaJWT, { expiresIn: '8h' })
        
        const { senha:_, ...dadosUsuario } = usuario
        
        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        })

    } catch (error) {
        return res.status(404).json(error)
    }

}

module.exports = login;