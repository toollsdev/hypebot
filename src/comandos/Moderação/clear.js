module.exports = {
    config: {
      nome: 'clear',                                                   
      aliases: ['cl', 'limparchat'],
      descricao: 'Comando que limpa o chat.',  
      utilizacao: '!clear [quantidade de mensagens]',
      cooldown: 3
    },
    run: async (client, message, args) => {
if(!message.channel.permissionsFor(message.member.id).has('MANAGE_MESSAGES')) return message.reply('você não tem permissão para apagar mensagens neste canal!') 
    if(!message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) return message.reply('eu não tenho permissão para apagar mensagens neste canal!') 
    
    if(!args[0]) return message.reply(`informe a quantidade`)
    if(isNaN(args[0])) return message.reply('informe uma quantidade numérica!')

    const quantidade = Number(args[0]);
    if(quantidade < 2 || quantidade > 100) return message.reply('você deve informar um número de 2 a 100!')

    const channelMessages = await message.channel.messages.fetch({ limit: quantidade }),
    oldMessages = channelMessages.filter(m => Date.now() - m.createdTimestamp >= (14 * 24 * 60 * 60 * 1000)).size,
    messagesToClear = quantidade - oldMessages;

    message.channel.bulkDelete(messagesToClear).then(() => {
        if(oldMessages < 1) message.reply(`${quantidade} ${(quantidade > 1) ? "mensagens foram apagadas" : "foi apagada"} deste canal por ${message.author}!`)
        else message.reply(`${quantidade} ${(quantidade > 1) ? "mensagens foram apagadas" : "foi apagada"} deste canal por ${message.author}! ${oldMessages} ${(oldMessages > 1) ? "não puderam ser apagadas, pois foram enviadas" : "não pôde ser apagada, pois foi enviada"} há mais de 14 dias!`)
    }).catch((err) => console.log(err))
    }
}