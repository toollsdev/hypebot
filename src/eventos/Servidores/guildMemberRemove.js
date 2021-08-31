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
  .setColor("#7289DA")
  .addField('Adeus!', `Que pena, nosso querido ${member} acabou de sair do servidor =(`)
  .setThumbnail(member.user.displayAvatarURL())
  .setURL(member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
  .setTimestamp(new Date())
  .setFooter(`Sistema feito por Adrian`, 'https://i.imgur.com/xs61abA.png')
 
  const canalsaidac = client.channels.cache.get(result[0].canal_saida);

  canalsaidac.send(embed2)

  });

}
