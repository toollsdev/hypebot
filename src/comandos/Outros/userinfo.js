const Discord = require("discord.js"); 
const moment = require('moment');


module.exports = {
    config: {
      nome: 'userinfo',
      aliases: ['user'],
      descricao: 'Comando para ver as infos de um usuario',
      utilizacao: '',
      cooldown: 5
    },

run: async (client, message, args) => {


  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 64 });

 const joinServer = moment(user.joinedAt).format('llll');
 const joinDiscord = moment(user.createdAt).format('llll');

  let embed = new Discord.MessageEmbed() 
    .setColor(`RANDOM`) 
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
    .addFields(
		{ name: ':bookmark: Tag do Discord*: ', value: `${message.author.tag}`, inline: true },
		{ name: ':computer: ID do Discord: ', value: `${message.author.id} `, inline: true },
		{ name: ':date: Conta criada em: ', value: `${moment.utc(user.createdAt)}`, inline: true },
    { name: ':star2: Entrou há: ', value: `${moment.utc(user.joinedAt)}`, inline: true },
    { name: ':video_game: Jogando: ', value: `${message.author.presence.game}`, inline: true },
    { name: ':earth_americas: Região: ', value: `${message.guild.region}`, inline: true },
	)
    .setThumbnail(avatar)
 await message.channel.send(embed); 
}
}