const knex = require('../../../config/conexaoDB')


const editarDadosDoUsuario = async (req, res) => {
    const { id } = req.params
    const { nome, email, cpf } = req.body

    try {

        const clienteIdExiste = await knex('clientes').where({ id }).returning('*')

        if (clienteIdExiste.length === 0) {
            return res.status(404).json({ mensagem: "Cliente não existe." });
        }
        const verificarEmail = await knex('clientes').where({ email })


        if (verificarEmail.length > 0 && verificarEmail[0].email !== req.body.email) {
            return res.status(404).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }

        const verificarCpf = await knex('clientes').where({ cpf })

        if (verificarCpf.length > 0 && verificarCpf[0].cpf !== req.body.cpf) {
            return res.status(404).json({ mensagem: "O Cpf informado já está sendo utilizado por outro usuário." })
        }

        const editarCliente = await knex('clientes').where({ id }).update({ nome, email, cpf }).returning('*')
        return res.status(200).json(editarCliente)

    } catch (error) {
        
        return res.status(500).json("Erro interno do servidor.")
    }
}

module.exports = editarDadosDoUsuario
