const knex = require('../../../config/conexaoDB')

const registerClient = async (req, res) => {
    const {nome, email , cpf, cep, rua, numero, bairro , cidade, estado} = req.body;

    const { alreadyExistsErrorMsg, internServerErrorMsg, successRegMsg } = require('../../../alerts/alerts');
    try {        
        const verifiedEmail = email.toLowerCase();
        const existClient = await knex("clientes").where({email: verifiedEmail}).orWhere({cpf}).first();

       if(existClient){
           return res.status(400).json({mensagem: `Email or CPF ${alreadyExistsErrorMsg()}`})
       }
    await knex("clientes").insert({nome, email: verifiedEmail, cpf, cep, rua , numero, bairro, cidade , estado})
    return res.status(201).json({mensagem: successRegMsg()})

}catch(error){
    console.log(error);
    return res.status(500).json({mensagem: internServerErrorMsg()})
}
}

module.exports = registerClient ;