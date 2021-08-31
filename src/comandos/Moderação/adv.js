const Discord = require("discord.js");
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


module.exports = {
  config: {
    nome: 'adv',
    aliases: ['advertencia', 'advuser'], 
    descricao: 'Dar advertência para alguém.',
    utilizacao: '!adv [@mencione o usuário] [id] [motivo]',
    cooldown: 3                                               
  },
  run: async (client, message, args) => {
    connection.query("SELECT * FROM bot_cfg", async (err, result3, fields) =>{

if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')
message.delete({timeout:1000});
if(!args[0]) return message.reply("Você não citou ninguém!").then(m => m.delete({timeout: 5000}));
let advMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!advMember) return message.reply("Você não citou ninguém ou não foi possível encontrar este usuário!");
if(!args[1]){
    return message.reply("Você não colocou o ID de advertência!");
}
let args3 = args.slice(2).join(" ")
if(!args3){
    return message.reply("Você não colocou um motivo");
}

if(advMember == message.member) return message.reply("você não pode se dar advertência!");
if (message.member.roles.highest.position <= advMember.roles.highest.position) return message.reply("você não tem permissão para banir esse membro, ele tem um cargo superior ao seu!"); 
if (message.guild.me.roles.highest.position <= advMember.roles.highest.position) return message.reply("não tenho permissão para banir esse membro, ele tem um cargo superior ao meu!");
connection.query(`SELECT * FROM bot_advs WHERE user_id = ${args[1]} `, async (err, result, fields) =>{
   const cadrianfodao = result;
    if (err) throw err;

    if(cadrianfodao.length === 2){

message.reply("`" + advMember.user.tag + "` advertido com sucesso!").then(m => m.delete({timeout: 5000}));
  var sql = `INSERT INTO bot_advs (user_id, motivo, staff, user_dc) VALUES ('${args[1]}', '${args3}', '${message.author.username}', '${advMember.user.username}#${advMember.user.discriminator}')`;
  connection.query(sql, async (err, result5) =>{
    if (err) throw err;

    connection.query(`UPDATE vrp_users SET whitelisted = '0', banned = '1' WHERE id = '${args[1]}'`, (err, rows) => { //atualizando a whitelist do servidor
   });
   var sql = `DELETE FROM bot_advs WHERE user_id = '${args[1]}'`;
   connection.query(sql, function (err, result) {
     if (err) throw err;
   });
 
 await advMember.user.send(`Você foi banido do Discord por 7 dias, e do Servidor por excesso de advertências (3/3). Última advertência causadora do banimento: **${args3}, ID: ${result5.insertId}, aplicador: ${message.author}**.\n\n**Se acha que isso foi um erro, contate ${message.author}**`);
    advMember.ban({ reason: `Banido por excesso de advertências (3/3). Última advertência causadora do banimento: **${args3}**.`, days: 7});
    message.reply("`" + advMember.user.tag + "` foi banido por 7 dias do Discord, e do Servidor excesso de advertências (3/3)!")   

const embed = new Discord.MessageEmbed()
    .setTitle(`Advertência - Registrada.`)
    .setColor("#FF0000")
    .setDescription(`O Jogador **${advMember.user}** foi **advertido** pelo staff **${message.member}**.`)
    .addField('Jogador:', `${advMember.user}`, true)
    .addField('Staff:', `${message.member}`, true)
    .addField('ID da Advertência:', `${result5.insertId}`, true)
    .addField("Informações:\n", "Informações extras sobre o jogador:")
    .addField('Motivo:', `${args3}`, true)
    .addField('Quantidade atual:', `${cadrianfodao.length + 1}/3`, true)
    .setTimestamp()
    .setFooter(`Atenciosamente.`);
  message.channel.send(embed);
//  JOGADOR

  const embeduser = new Discord.MessageEmbed()
  .setTitle(`Advertência - Registrada.`)
  .setColor("#FF0000")
  .setDescription(`Você foi **advertido** pelo staff **${message.member}**.`)
  .addField('Staff:', `${message.member}`, true)
  .addField('ID da Advertência:', `${result5.insertId}`, true)
  .addField("Informações:\n", "Informações extras:")
  .addField('Motivo:', `${args3}`, true)
  .addField('Quantidade atual:', `${cadrianfodao.length + 1}/3`, true)
  .setTimestamp()
  .setFooter(`Agradecemos pela compreensão. Atenciosamente!`);
  advMember.user.send(embeduser);
});
} else{
    connection.query(`SELECT * FROM bot_advs WHERE user_id = ${args[1]} `, async (err, result, fields) =>{
        const cadrianfodao = result;
     
    if(cadrianfodao.length + 1 === 1){
       client.guilds.cache.get(result3[0].iddoservidor).members.cache.get(advMember.user.id).roles.add(result3[0].adv1)

    }
    if(cadrianfodao.length + 1 === 2){
        client.guilds.cache.get(result3[0].iddoservidor).members.cache.get(advMember.user.id).roles.remove(result3[0].adv1)
        client.guilds.cache.get(result3[0].iddoservidor).members.cache.get(advMember.user.id).roles.add(result3[0].adv2)

    }
if(cadrianfodao.length + 1 === 3){
    client.guilds.cache.get(result3[0].iddoservidor).members.cache.get(advMember.user.id).roles.remove(result3[0].adv2)
     client.guilds.cache.get(result3[0].iddoservidor).members.cache.get(advMember.user.id).roles.add(result3[0].adv3)
    }
    message.reply("`" + advMember.user.tag + "` advertido com sucesso!").then(m => m.delete({timeout: 5000}));
  var sql = `INSERT INTO bot_advs (user_id, motivo, staff, user_dc) VALUES ('${args[1]}', '${args3}', '${message.author.username}', '${advMember.user.username}#${advMember.user.discriminator}')`;
  connection.query(sql, async (err, result4) =>{
    if (err) throw err;

  const embed = new Discord.MessageEmbed()
    .setTitle(`Advertência - Registrada.`)
    .setColor("#FF0000")
    .setDescription(`O Jogador **${advMember.user}** foi **advertido** pelo staff **${message.member}**.`)
    .addField('Jogador:', `${advMember.user}`, true)
    .addField('Staff:', `${message.member}`, true)
    .addField('ID da Advertência:', `${result4.insertId}`, true)
    .addField("Informações:\n", "Informações extras sobre o jogador:")
    .addField('Motivo:', `${args3}`, true)
    .addField('Quantidade atual:', `${cadrianfodao.length + 1}/3`, true)
    .setTimestamp()
    .setFooter(`Atenciosamente.`);
  message.channel.send(embed);
//  JOGADOR

  const embeduser = new Discord.MessageEmbed()
  .setTitle(`Advertência - Registrada.`)
  .setColor("#FF0000")
  .setDescription(`Você foi **advertido** pelo staff **${message.member}**.`)
  .addField('Staff:', `${message.member}`, true)
  .addField('ID da Advertência:', `${result4.insertId}`, true)
  .addField("Informações:\n", "Informações extras:")
  .addField('Motivo:', `${args3}`, true)
  .addField('Quantidade atual:', `${cadrianfodao.length + 1}/3`, true)
  .setTimestamp()
  .setFooter(`Agradecemos pela compreensão. Atenciosamente!`);
  advMember.user.send(embeduser);
});

}
    )}
})
}
)}
}