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
  nome: 'set',
  aliases: ['pedirset', 'set'],
  descricao: 'Comando que faz o pedido de setagem.',
  utilizacao: '!pedirset',
  cooldown: 10
},

//      ___       _______  .______       __       ___      .__   __.     __    __  ____    ____ .______    _______    .______     ______   .___________.
//     /   \     |       \ |   _  \     |  |     /   \     |  \ |  |    |  |  |  | \   \  /   / |   _  \  |   ____|   |   _  \   /  __  \  |           |
//    /  ^  \    |  .--.  ||  |_)  |    |  |    /  ^  \    |   \|  |    |  |__|  |  \   \/   /  |  |_)  | |  |__      |  |_)  | |  |  |  | `---|  |----`
//   /  /_\  \   |  |  |  ||      /     |  |   /  /_\  \   |  . `  |    |   __   |   \_    _/   |   ___/  |   __|     |   _  <  |  |  |  |     |  |     
//  /  _____  \  |  '--'  ||  |\  \----.|  |  /  _____  \  |  |\   |    |  |  |  |     |  |     |  |      |  |____    |  |_)  | |  `--'  |     |  |     
// /__/     \__\ |_______/ | _| `._____||__| /__/     \__\ |__| \__|    |__|  |__|     |__|     | _|      |_______|   |______/   \______/      |__|     

run: async (client, message, args) => {

  connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{
    if (err) throw err;

  message.delete();
  // CONFIGURAÇÃO DA WHITE-LIST!

    if (err) throw err;
  if(message.channel.id !== result[0].canalsetagem) return message.channel.send(message.author.toString() + ` Você não pode usar este comando nesse chat. Utilize: <#${result[0].canalsetagem}>`)

    let guild = message.guild;

        const channel2 = await guild.channels.create(`setagem-${message.author.username}`,{
        type: 'text',
        parent: result[0].iddacategoria,
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
    channel2.send(`<@${message.author.id}>`)
    const embed = new Client.MessageEmbed()
    .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                      .setTitle(`Canal de Pedir Setagem - Criado!`)
                      .setDescription(`E aí, **<@${message.author.id}>**!\nAcabei de criar seu canal de Pedir Setagem. Você tem 50 segundos a partir de **agora** em cada **pergunta**.\n\n**Canal**: ${channel2}`)
                      .setTimestamp(new Date())
                      .setFooter(`HypeBot`)

                      message.channel.send(embed).then(m => m.delete({timeout: 5000}));

    
    async function createForm({ questions, channel, time, user }) {
const { once } = require("events")

const answers = []

for (const question of questions) {

  const embed = new Client.MessageEmbed()
  .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                    .setTitle(`Pedido de Setagem\n`)
                    .addField("Pergunta: ", `${question} \n\n\`Você têm ${time/1000} segundos para responder!\``)
                    .setTimestamp(new Date())
                    .setFooter(`Leia com atenção!`)

    channel2.send(embed)

  const filter = m => m.author.id === user.id && m.channel.id === channel2.id && m.content.length >= 1
  const options = { time: time, max: 1 }

  const collector = channel2.createMessageCollector(filter, options)

  const [collected, reason] = await once(collector, 'end')

  if (reason == 'limit') answers.push(collected.first().content)
  
  else if (reason == 'channelDelete') throw new Error('channelDelete')
  
  else if (reason == 'time') throw new Error('time')

}

return answers

}


createForm({ 
questions: [
"Qual o nome do seu personagem?",

"Qual o seu ID?",

"Qual o nome da organização?",

"Tipo de setagem? (Jogo ou Discord)",

"Quem ordenou a setagem?"
], 
channel: message.channel2, 
time: 50000, 
user: message.author 
})
.then(respostas => {

  const embedstaff = new Client.MessageEmbed()
  .setColor("#FF0000")//COR DA CAIXA DE DIALOGO
                    .setTitle(`Pedido de Setagem\n`)
                    .addField('USUÁRIO:', `<@${message.author.id}>`)
                    .addField('ID:', `> ${respostas[1]}`)
                    .addField('Nome do Personagem:', `> ${respostas[0]}`)
                    .addField('Nome da Organização:', `> ${respostas[2]}`)
                    .addField('Tipo de Setagem:', `> ${respostas[3]}`)
                    .addField('Ordem da Setagem:', `> ${respostas[4]}`)
                    .setAuthor('System Exclusivo - Revoada RP', result[0].imgwl, 'https://discord.gg/Jh3NJM2XeF')
                    .setThumbnail(result[0].imgwl)
                    .setTimestamp(new Date())
                    .setFooter(`Pedido de Setagem - 👍 Membro Setado | ❗ Membro não Setado.`)
                    client.channels.cache.get(result[0].resultadowlstaff).send(embedstaff).then(msg => {
                            msg.react('👍')
                            msg.react('❗')
                    })
                    
  channel2.delete()

})

.catch(err => {
if (err.message == 'time') {
  console.log(`Cancelamos seu pedido de setagem, pois você ignorou o pedido cancelado.`)
  message.author.send(`Você reprovou pois o seu tempo acabou. Tente novamente.`)
  channel2.delete()
} else if (err.message == 'channelDelete') {
  console.log(`O canal foi deletado e por isto o formulário foi cancelado.`)
  message.author.send(`Cancelamos seu pedido de setagem, pois o seu canal foi deletado. Tente novamente.`)
} else {
  console.log(`Algo deu errado ao trabalhar o formulário!`, err)
  message.author.send(`Aconteceu algo com o bot/servidor. Tente novamente mais tarde.`, err)
  channel2.delete()
}
})

}

  )}

}    