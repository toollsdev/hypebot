const Discord = require("discord.js");
const mysql = require('mysql'); 
const { conexaodb } = require("../../../config.json")
const { userdb } = require("../../../config.json")
const { senhadb } = require("../../../config.json")
const { db } = require("../../../config.json")
 
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
    nome: 'anunciarip',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
    aliases: ['anunciarip'],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
    descricao: 'Anuncia o IP do servidor',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
    utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
    cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
  },
  run: async (client, message, args) => {
    connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{
 
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')
    message.delete();
const embed = new Discord.MessageEmbed()
    .setTitle(`Campinas RolePlay - IP`)
    .setThumbnail(`${result[0].imgwl}`)
    .setColor("#FF0000")
    .setDescription(`:small_blue_diamond: IP do Servidor: **connect ${result[0].ip}:${result[0].porta}**\nCaso nao consiga conectar, **aperte F8 e cole:**\n` + " ```diff\nconnect  "+ ` ${result[0].ip} + :${result[0].porta}` + "```")
    .setFooter(`E aguarde as instruções do BOT!`);
  message.channel.send(embed);
  }
  )}
}