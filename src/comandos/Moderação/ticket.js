const Client = require('discord.js')
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
      nome: 'ticket',
      aliases: ['openticket'],
      descricao: 'Comando abre ticket.',
      utilizacao: '',
      cooldown: 300
    },

    run: async (client, message, args) => {
        message.delete();
        connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{
            if (err) throw err;
        const id_categoria_ticketc = client.channels.cache.get(result[0].id_categoria_ticket);
        const canal_tickets_recebidosc = client.channels.cache.get(result[0].canal_tickets_recebidos);

        const membro = message.author;
        const numeroticket = Math.floor(Math.random() * 999);
        let guild = message.guild;
            const channel2 = await guild.channels.create(`ticket-${message.author.username}-${numeroticket}`,{
            type: 'text',
            parent: id_categoria_ticketc,
            permissionOverwrites:[
                {
                    allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','EMBED_LINKS','ATTACH_FILES','SEND_MESSAGES'],
                    id: message.author.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: guild.id
                }
            ]
        }); 

const embed2 = new Client.MessageEmbed()
.setColor("#7289DA")//COR DA CAIXA DE DIALOGO
.addField('Ticket criado!', `Olá, ${membro}. Seu ticket foi criado com sucesso, porém, precisamos de mais informações para que possamos lhe atender melhor.\n\nSegue o modelo:\n**ID:\nMotivo:\nProvas/Prints:**\n\n**Numeração do Ticket: ${numeroticket}**`)
.setThumbnail(membro.displayAvatarURL())
.setURL(membro.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setTimestamp(new Date())
.setFooter(`Sistema feito por Adrian`, `${result[0].imgwl}`)

channel2.send(embed2)


channel2.send(`${membro}`)
canal_tickets_recebidosc.send(`O usuário ${membro} acabou de criar um ticket: ${channel2}.\n\n**Quando pegar o ticket, reaje com um 👍**`).then(msg => {
    msg.react('👍')
                    },
)
});
    }
    
}