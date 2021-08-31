const Client = require('discord.js')
const mysql = require("mysql");
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createConnection({
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});
connection.connect((err) => {
});

module.exports = async (client, member) => {
   connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{

    const embed2 = new Client.MessageEmbed()
     .setColor("#7289DA")//COR DA CAIXA DE DIALOGO
     .addField('Bem vindo!', `Olá, ${member} seja bem vindo ao nosso servidor! Dê uma olhada nas regras, hein =)\nFaça sua whitelist em <#${result[0].canaldewhitelist1}>`)
     .setThumbnail(member.user.displayAvatarURL())
     .setURL(member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
     .setTimestamp(new Date())
     .setFooter(`Sistema feito por Adrian`, 'https://i.imgur.com/xs61abA.png')
     
     const canalentradac = client.channels.cache.get(result[0].canal_boas_vindas);

     canalentradac.send(embed2)

    member.guild.channels.cache.get(result[0].canal_boas_vindas).send(embed2)


       member.roles.add(result[0].nonwhitelistcargo)
      });
    }
