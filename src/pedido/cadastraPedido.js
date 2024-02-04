const knex = require('../config/conexaoDB');
const schemaPedido = require('../valida/validarPedido')
const enviarEmailCliente = require('./enviarEmail')

const cadastrarPedido = async (req, res) => {
const {cliente_id, observacao, pedido_produtos,} = req.body

try {

    const clienteExiste = await knex('clientes').select('id').where('id', cliente_id).first();

    if (!clienteExiste) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }
     //verificação cada produto
    for (const item of pedido_produtos) {
        const produtoExistente = await knex.select('id', 'quantidade_estoque').from('produtos').where({ id: item.produto_id }).first();

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: `Produto com ID ${item.produto_id} não encontrado.` });
        }

        // Verificar a quantidade em estoque
        if (item.quantidade_produto > produtoExistente.quantidade_estoque) {
            return res.status(400).json({ mensagem: `Quantidade insuficiente em estoque para o produto com ID ${produtoExistente.id}.` });
        }
    }

    // Se todas as verificações passarem, cadastrar o pedido
    const [pedido_id] = await knex('pedidos').insert({
        cliente_id,
        observacao: observacao || '',
    }).returning('id');
    

    // Cadastrar os produtos do pedido na tabela de relacionamento

    const produtosPedido = pedido_produtos.map(item => ({
        pedido_id: item.pedido_id && item.pedido_id.id,
        produto_id: item.produto_id,
        quantidade_produto: item.quantidade_produto,
    }));
    
    await knex('pedido_produtos').insert(produtosPedido);
    



    await knex('pedido_produtos').insert(produtosPedido);

    // Atualizar a quantidade em estoque dos produtos
    for (const item of pedido_produtos) {
        await knex('produtos').where({ id: item.produto_id }).decrement('quantidade_estoque', item.quantidade_produto);
    }

    // Enviar e-mail para o cliente
    enviarEmailCliente(clienteExiste.nome, pedido_id);

    return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso." });

} catch (error) {
    console.log(error.message);
    
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
}

}

module.exports = cadastrarPedido