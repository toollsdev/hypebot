const Discord = require("discord.js"); 
const moment = require('moment');


module.exports = {
    config: {
      nome: 'setcanal_aprovados',
      aliases: [],
      descricao: 'Comando para ver as infos de um usuario',
      utilizacao: '',
      cooldown: 5
    },

run: async (client, message, args) => {
if(message.mentions.channels.size === 0)return;
let channels = message.mentions.channels
console.log(channels)

channels.map(channel => new Object(
  message.reply(`O canal de aprovados agora é: <#${channel.id}>`)
  ));
  
  }
}