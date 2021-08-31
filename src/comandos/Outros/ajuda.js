const Discord = require("discord.js");

module.exports = {
    config: {
      nome: 'ajuda',
      aliases: ['help'],
      descricao: 'Comando para ver os comandos.',
      utilizacao: '!ajuda',
      cooldown: 5
    },

run: async (client, message, args) => {

    let commands = client.commands

    if (message.member === null || !message.member.hasPermission('ADMINISTRATOR')) commands = commands.filter(c => !c.help.admin)

    commands.forEach(command => {

        const embed = new Discord.MessageEmbed()
        .setTitle(`Comandos - Bot`)
        .setColor("#FF0000")
        .setDescription(`**!${command.config.nome}** - ${command.config.descricao}\nUtilização: ${command.config.utilizacao}`)
        .setFooter(`E aguarde as instruções do BOT!`);
      message.author.send(embed)
        
    })
    message.channel.send(`E aí, <@${message.author.id}>! Mandei os comandos no seu privado =). Caso não chegou, verifique se eu posso te mandar mensagens!`).then(m => m.delete({timeout: 5000}));
    message.delete();
    }
}