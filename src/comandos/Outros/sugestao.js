const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const mysql = require('mysql'); 
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createConnection({
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});
connection.connect((err) => {
});

module.exports = {
    config: {
      nome: 'sugestao',
      aliases: ['sugestão', 'sugerir'],                               
      descricao: 'Comando para ver a foto do servidor.',
      utilizacao: '',
      cooldown: 4
	},
	
run: function (client, message, args) {
    message.delete()
    let suggestion = args.join(" ");
    if (!suggestion)
      return message.channel.send(`Por favor, dê uma sugestão!`).then(i=>i.delete(({ timeout: 10000 })));
        message.delete();
        connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{

    let sChannel = message.guild.channels.cache.get(result[0].sugestao);
      if(!sChannel) return message.channel.send("Esse canal nao existe!")
	  message.delete(5000);
    message.channel.send("Sua sugestão foi repassada à nossa equipe. Obrigado!").then(m => m.delete({timeout: 5000}));
    let suggestembed = new Discord.MessageEmbed()
	.setColor("#FFFFF1")
    .addField("Autor:", message.author)
    .addField("Sugestão:", suggestion)
    .setFooter("ID do Autor: " + message.author.id)
    .setThumbnail(result[0].imgwl)
    .setTimestamp()
	
    sChannel.send(suggestembed).then(async msg => {
      await msg.react("✅");
      await msg.react("❌");
    });
  });
  }
  
};

 
 