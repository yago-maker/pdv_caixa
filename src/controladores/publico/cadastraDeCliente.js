const knex = require('../../config/conexaoDB')

const cadastrarDeCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
        return res.status(400).json({ mensagem: 'Todos os campos acima devem ser preenchidos' })
    }

    try {
        const { nome, email, cpf } = req.body;

        const confirmarEmail = await knex("cliente").where("email", email).select();

        const confirmarCPF = await knex("cliente").where("cpf", cpf).select();

        if (confirmarEmail.length > 0) {
            return res.status(400).json({ mensagem: "Email já cadastrado!" })
        } else if (confirmarCPF.length > 0) {
            return res.status(400).json({ mensagem: "CPF já cadastrado!" })
        }

        const novoCliente = await knex('cliente').insert({ nome, email, cpf }).returning('*')

        if (novoCliente === 0) {
            return res.status(400).json('Cliente não cadastrado.')
        }

        res.status(201).json('Cliente Cadastrado');
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ mensagem: "Um erro inesperado ocorreu no servidor" });
    }
};

module.exports = { cadastrarCliente };