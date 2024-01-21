const knex = require('./../../config/conexaoDB')
const bcrypt = require('bcrypt')


const cadastrar = async (req, res) => {

    const { nome, email, senha } = req.body

    try {

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        if (!nome || !email || !senha) {
            return res.status(404).json("Todos os campos são obrigatórios.")
        }

        const verificarEmailExistente = await knex.select('email').from('usuarios').where({ email })

        if (verificarEmailExistente.length > 0) {
            return res.status(404).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }

        const novoUsuario = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*')

        return res.status(200).json(novoUsuario)

    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = cadastrar

