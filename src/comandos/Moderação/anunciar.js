const Discord = require("discord.js");

module.exports = {
  config: {
    nome: 'anunciar',
    aliases: ['say', 'anunc'], 
    descricao: 'Anunciar algo.',
    utilizacao: '!anunciar (TEXTO) [LEMBRE-SE QUE O BOT SEMPRE VAI ANUNCIAR NO CANAL EM QUE VOCÊ DIGITOU O COMANDO]',
    cooldown: 3                                               
  },
  run: async (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')

let arg1 = args.slice().join(" ")

const embed = new Discord.MessageEmbed()
    .setTitle(`Anúncio - Equipe`)
    .setColor("#FF0000")
    .setDescription(`${arg1}`)
    .setFooter(`Atenciosamente ❤️`);
  message.channel.send(embed);
  }
}
