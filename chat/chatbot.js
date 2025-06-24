const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

const userFlows = {};
const servicos = ['elétrica', 'pedreiro', 'chaveiro', 'pintor', 'hidráulica'];

client.on('message', async msg => {
    const from = msg.from;
    const text = msg.body.toLowerCase().trim();

    // Se usuário não iniciou o fluxo, envia a mensagem inicial com lista de serviços
    if (!userFlows[from]) {
        const contact = await msg.getContact();
        const nome = contact.pushname || 'amigo';
        userFlows[from] = { step: 'perguntarServico' };
        await client.sendMessage(from, `Olá ${nome}, como podemos ajudar?\nPor favor, escolha um dos serviços domésticos:\n- elétrica\n- pedreiro\n- chaveiro\n- pintor\n- hidráulica`);
        return;
    }

    const state = userFlows[from];

    if (state.step === 'perguntarServico') {
        if (servicos.includes(text)) {
            state.servico = text;
            state.step = 'pedirDescricao';
            await client.sendMessage(from, 'Por favor, descreva o problema.');
        } else {
            await client.sendMessage(from, 'Serviço inválido. Escolha entre: elétrica, pedreiro, chaveiro, pintor, hidráulica.');
        }
        return;
    }

    if (state.step === 'pedirDescricao') {
        state.descricao = msg.body.trim();
        state.step = 'pedirEndereco';
        await client.sendMessage(from, 'Por favor, informe seu endereço para que possamos enviar um prestador próximo.');
        return;
    }

    if (state.step === 'pedirEndereco') {
        const endereco = msg.body.trim();
        // Validação simples: endereço com pelo menos 5 caracteres
        if (endereco.length < 5) {
            await client.sendMessage(from, 'Endereço inválido. Por favor, informe um endereço completo.');
            return;
        }
        // Confirmação final
        await client.sendMessage(from, `Você pediu ${state.servico} com a seguinte descrição: "${state.descricao}".\nUm prestador próximo ao endereço "${endereco}" estará a caminho.`);
        delete userFlows[from];
        return;
    }
});
