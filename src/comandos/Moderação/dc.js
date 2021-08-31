module.exports = {
    config: {
      nome: 'dc',
      aliases: ['deletarcanal'],
      descricao: 'Comando que deleta o canal.',
      utilizacao: '!dc',
      cooldown: 0
    },
    run: async (client, message, args) => {
      if(!message.channel.permissionsFor(message.member.id).has('MANAGE_CHANNELS')) return message.reply('você não tem permissão para apagar mensagens neste canal!') 
      if(!message.channel.permissionsFor(client.user.id).has('MANAGE_CHANNELS')) return message.reply('eu não tenho permissão para apagar mensagens neste canal!') 
        message.channel.delete()
    }
  }
  