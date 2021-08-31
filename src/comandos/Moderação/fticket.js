const { Channel } = require("discord.js");
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
      nome: 'fticket',
      aliases: ['fecharticket', 'closeticket'],
      descricao: 'Fecha o ticket.',
      utilizacao: '!fticket [Mencione o usuario] [ID do ticket] [MOTIVO]',
      cooldown: 3
    },
    run: async (client, message, args) => {

  
        message.delete()


        if(!message.member.hasPermission("BAN_MEMBERS")) return; 
        let usuario = message.mentions.users.first()
        if(!args[0]){
         return message.reply("Você se esqueceu de mencionar o usuário")
        }
        if(!args[1]){
            return message.reply("Você se esqueceu de fornecer o id do ticket");
        }
        if(!args[2]){
            return message.reply("Você se esqueceu de informar o motivo");
        }
    
        let motivo = args.slice(2).join(" ")
        usuario.send(`Seu ticket ID **${args[1]}** foi fechado pelo motivo: **${motivo}** pelo staff: **${message.author.tag}**.\n\n**Seu caso realmente foi resolvido? Lembrando que este é um chat entre eu e você! Caso não, contate o CEO do servidor.\nAgradecemos o contato!**`);
        message.channel.delete()
        connection.query("SELECT * FROM bot_cfg", function (err, result, fields) {
            if (err) throw err;
        const canalstaff_fticket = client.channels.cache.get(result[0].channel_staff_fticket);
        canalstaff_fticket.send(`O usuário **${usuario}**, com a numeração do ticket **${args[1]}** teve o ticket fechado pelo staff **@${message.author.tag}**. Motivo: **${motivo}**`)
     });
    }
}