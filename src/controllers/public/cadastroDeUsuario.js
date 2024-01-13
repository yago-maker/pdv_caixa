const pool = require('./../../config/conexaoDB')
const bcrypt = require('bcrypt')


const cadastrar = async (req, res) => {

    const { nome, email, senha } = req.body

    try {

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        if (!nome || !email || !senha) {
            return res.status(404).json("Todos os campos são obrigatórios.")
        }

        const verificarEmailExistente = await pool.query('select * from usuarios where email = $1', [email])

        if (verificarEmailExistente.rows.length > 0) {
            return res.status(404).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }

        const novoUsuario = await pool.query('insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *', [nome, email, senhaCriptografada])

        return res.status(201).json(novoUsuario.rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = cadastrar

