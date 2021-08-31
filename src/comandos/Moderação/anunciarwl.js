const Discord = require("discord.js");
const mysql = require('mysql'); 
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createConnection({ //Info da database, para conectar
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});
connection.connect((err) => {
});

module.exports = {
  config: {
    nome: 'anunciarwl',
    aliases: ['anunciarwl'],
    descricao: 'AnunciarWL',
    utilizacao: '!anunciarwl',
    cooldown: 3
  },
  run: async (client, message, args) => {
  	      connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')
	
const embed = new Discord.MessageEmbed()
    .setTitle(`Whitelist - Roleplay`)
    .setThumbnail(`${result[0].imgwl}`)
    .setColor("#FF0000")
    .setDescription(`Sistema de whitelist exclusivo! :white_check_mark:\nPara fazer sua whitelist digite neste canal:\n` + "```diff\n!whitelist```" )
    .setFooter(`E aguarde as instruções do BOT!`);
  message.channel.send(embed);
  }
          )}
}
