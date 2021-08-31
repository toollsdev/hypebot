const { Collection, MessageEmbed } = require('discord.js')
const mysql = require('mysql'); 
const { prefix, conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createConnection({ 
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});
connection.connect((err) => {
});

const cooldowns = new Collection()

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') return
    connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{

     if(message.content.toLowerCase() !== "!whitelist" && message.content.toLowerCase() !== "!anunciarwl" && message.channel.id == result[0].canaldewhitelist1){
        message.reply("Sem conversa nesse canal! Somente Whitelist.").then(i=>i.delete(({ timeout: 10000 })));
        message.delete();
     }
    });
    if(!message.member.hasPermission('ADMINISTRATOR')){ //só vai bloquear o invite caso quem o enviou não tenha permissão de admin

      if(message.content.includes('discord.gg/' || 'discordapp.com/invite/')){ //reconhece se há um invite na mensagem
  
          message.delete() //deleta a msg com invite
            .then(message.channel.send(`${message.author}, você não pode enviar convites de servidores aqui!`));
  
      }
  
  }

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()
    if (!message.content.startsWith(prefix)) return 





    const comandoInfo = client.commands.get(comando) || client.commands.get(client.aliases.get(comando))

    if (comandoInfo) {
      if (!cooldowns.has(comandoInfo.config.nome)) cooldowns.set(comandoInfo.config.nome, new Collection())

      const now = Date.now()
      const timestamps = cooldowns.get(comandoInfo.config.nome)
      const cooldown = (comandoInfo.config.cooldown || 0) * 1000

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldown;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message
              .reply(`você precisa esperar mais ${timeLeft.toFixed(1)} segundo(s) até poder usar esse comando novamente.`)
              .then(msg => msg.delete({ timeout: timeLeft * 1000 }).catch(e => console.log('Ocorreu um erro tentando apagar a mensagem do bot.')))
              .catch(e => console.log('Ocorreu um erro tentando enviar a mensagem no chat.'))
        }
      }

      timestamps.set(message.author.id, now)
      setTimeout(() => timestamps.delete(message.author.id), cooldown)

      comandoInfo.run(client, message, args)
    }
}
