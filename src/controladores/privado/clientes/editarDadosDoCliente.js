const knex = require('../../../config/conexaoDB');
const { notFoundMsg, alreadyExistsErrorMsg, successEditMsg, internServerErrorMsg } = require('../../../alerts/alerts');

const updateClient = async (req, res) => {
    const { id } = req.params; // Extraímos o id dos params
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body; // Extraímos os outros campos do body

    try {
        // Verifica se o cliente existe
        const existClient = await knex("clientes").where({ id }).first();

        if (!existClient) {
            return res.status(404).json({ mensagem: notFoundMsg() });
        }

        const verifiedEmail = email.toLowerCase();

        // Função para validar se já existe um dado no banco
        const validDataExists = async (register, data, id) => {
            const dataExists = await knex("clientes")
                .where(register, '=', data)
                .whereNot({ id })
                .first();
                
            return !!dataExists; // Retorna true se existir, caso contrário false
        }

        const cpfExists = await validDataExists('cpf', cpf, id);
        const emailExists = await validDataExists('email', verifiedEmail, id);
        
        if (cpfExists || emailExists) {
            return res.status(400).json({ mensagem: `Email ou CPF ${alreadyExistsErrorMsg()}` });
        }

        // Atualiza os dados do cliente
        await knex("clientes")
            .where({ id })
            .update({
                nome,
                email: verifiedEmail,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            });

        return res.status(200).json({ mensagem: successEditMsg() });
    } catch (error) {
    
        return res.status(500).json({ mensagem: internServerErrorMsg() });
    }
}

module.exports = updateClient;
