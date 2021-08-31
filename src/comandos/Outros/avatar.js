const Client = require('discord.js')

module.exports = {
    config: {
      nome: 'avatar',
      aliases: [],                               
      descricao: 'Comando que pega o avatar do user.',
      utilizacao: '!avatar @user',                                               
      cooldown: 3
    },
    run: async (client, message, args) => {
        let mlk = message.mentions.users.first()
if(!args[0]){
 mlk = message.author
}
const embed = new Client.MessageEmbed()
.setTitle(`🖼️ Imagem de ${mlk}`)
.setImage(mlk.displayAvatarURL())
.setURL(mlk.avatarURL({ format: 'png', dynamic: true, size: 1024 }))

message.channel.send(`${message.author}`)
message.channel.send(embed) 

    }
}