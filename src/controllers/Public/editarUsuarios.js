const knex = require('./../../config/conexaoDB')
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
    const resultado = await db
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

    await db('usuarios')
      .where('id', usuarioId)
      .update({ nome, email, senha: senhaCriptografada });

    res.status(204).end();
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = atualizarUsuario