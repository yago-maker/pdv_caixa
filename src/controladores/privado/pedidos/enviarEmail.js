const nodemailer = require('nodemailer');

// Função para enviar e-mail para o cliente
const enviarEmailCliente = (nomeCliente, pedido) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use a senha de aplicativo gerada
        },
    });

    // Corpo do e-mail
    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: 'yagodev974@gmail.com',
        subject: 'Pedido Efetuado com Sucesso',
        text: `Olá ${nomeCliente}, seu pedido foi efetuado com sucesso!\nDetalhes do Pedido: ${JSON.stringify(pedido)}`,
    };

    // Enviar e-mail
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error.message);
        } else {
            console.log('E-mail enviado:', info.response);
        }
    });
}

module.exports = enviarEmailCliente; // Corrigido o nome da função exportada
