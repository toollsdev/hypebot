const Discord = require("discord.js"); 

module.exports = {
    config: {
      nome: 'denunciar',
      aliases: ['denunc', 'report'],
      descricao: 'Comando para denunciar um usuario',
      utilizacao: '',
      cooldown: 5
    },

run: async (client, message, args) => {
let acusado = args[0];
let why = args[1];
message.channel.send("Deseja mesmo denunciar o acusado?").then(msg => { // evento para reagir a mensagem
    msg.react('👍').then(r => { // mod
    msg.react('👎').then(r => { // uteis   
})
})
const ConfirmarFilter = (reaction, user, ) => reaction.emoji.name === '👍' && user.id === message.author.id;
const NegarFilter = (reaction, user, ) => reaction.emoji.name === '👎' && user.id === message.author.id;
const Confirmar = msg.createReactionCollector(ConfirmarFilter);
const Negar = msg.createReactionCollector(NegarFilter);
Confirmar.on('collect', r2 => { 
    if(!acusado) return message.reply("**Você precisa especificar o acusado usando @.**");
    if(!why) return message.reply("**Você precisa dizer o motivo pelo qual está acusando o reportado logo após o @.**");
    if(acusado == message.author.id) return message.reply("**Você não pode denunciar a si mesmo, seu masoquista!**")
    
    
    
    message.reply("**Denuncia enviada com sucesso, um membro da staff irá analisa-la.**");
    nome = acusado.username
    client.channels.cache.get(`780831886221115402`).send({embed: {
    color: 854646,
    title: "Denúncia",
    description: "Nome Acusado: "+nome+ "\n\nID Acusado: "+acusado+"."+" \n\n Acusador: <@" + message.author.id + ">. \n\nMotivo: "+why
    }});

    message.channel.delete
})

Negar.on('collect', r2 => {
message.reply("Denuncia cancelada com sucesso!")
})

});
}
}