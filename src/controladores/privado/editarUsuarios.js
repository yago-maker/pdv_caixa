const knex = require('../../config/conexaoDB')
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioId = req.usuario.id;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  try {
    const resultado = await knex
      .select('*')
      .from('usuarios')
      .where('email', email)
      .whereNot('id', usuarioId);

    if (resultado.length > 0) {
      return res.status(400).json({
        mensagem: "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex('usuarios')
      .where('id', usuarioId)
      .update({ nome, email, senha: senhaCriptografada })

    return res.status(200).json({mensagem: "Usuario atualizado com sucesso"})
    
  } catch (erro) {
    
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = atualizarUsuario