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
      nome: 'whitelist',
      aliases: ['wl'],
      descricao: 'Comando que faz a whitelist.',
      utilizacao: '!whitelist',
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
      if(message.channel.id !== result[0].canaldewhitelist1) return message.channel.send(message.author.toString() + ` Você não pode usar este comando nesse chat. Utilize: <#${result[0].canaldewhitelist1}>`)
  
        let guild = message.guild;

            const channel2 = await guild.channels.create(`whitelist-${message.author.username}`,{
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
                          .setTitle(`Canal de Whitelist - Criado!`)
                          .setDescription(`E aí, **<@${message.author.id}>**!\nAcabei de criar seu canal de Whitelist. Você tem 50 segundos a partir de **agora** em cada **pergunta**.\n\n**Canal**: ${channel2}`)
                          .setTimestamp(new Date())
                          .setFooter(`HypeBot`)
    
                          message.channel.send(embed).then(m => m.delete({timeout: 5000}));

        
        async function createForm({ questions, channel, time, user }) {
    const { once } = require("events")
  
    const answers = []
  
    for (const question of questions) {

      const embed = new Client.MessageEmbed()
      .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                        .setTitle(`Pergunta da WhiteList\n`)
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
  "Qual seu nome e sua idade?",

  "Qual o ID apresentado no seu jogo?",
 
  "Qual o nome do seu personagem?",

  "1. Roleplay significa...?\n\n 1⃣ Mata-Mata  \n\n 2⃣ Role com os Amigos \n\n 3⃣  Simular a vida real \n\n 4⃣ Simular a Fantasia",

  "2. O que é RDM? \n\n 1⃣ RDM é usada para quem abusou de bug. \n\n 2⃣ RDM é atropelar alguém sem motivos. \n\n 3⃣ RDM é matar alguém sem motivos. \n\n 4⃣ RDM é sacar uma arma e ameaçar alguém. ",
  
  "3. O que é considerado anti RP? \n\n 1⃣ Vender drogas em área safe \n\n 2⃣ É você quebrar as regras do servidor. \n\n 3⃣ E você cometer infrações de trânsito. \n\n 4⃣ É você fazer rp de bandido. ",
  
  "4. O que é AMOR A VIDA? \n\n 1⃣ Reagir a um assalto. \n\n 2⃣ É valorizar a sua vida como ela fosse única. \n\n 3⃣ É ter amor próprio. \n\n 4⃣ E pular de uma ponte para evitar não ser pego. ",
  
  "5. O que é PowerGaming? \n\n 1⃣ É você ter super forças no jogo. \n\n 2⃣ E você usar informação fora do jogo. \n\n 3⃣ É abusar da mecânica do jogo \n\n 4⃣ E você fazer um rp forçando com os players.",
  
  "6. O que é MetaGaming? \n\n 1⃣ Aproveitar de informações externas e levar pro jogo. \n\n 2⃣ É você fazer RP baseado em metas de missões. \n\n 3⃣ É você pedir alguém em Casamento \n\n 4⃣ É você jogar usando Discord ",
  
  "7. O que é COMBAT LOGGING? \n\n 1⃣ É entrar em combate na ação. \n\n 2⃣ É chamar alguém para lutar. \n\n 3⃣ É deslogar do servidor para fugir de abordagem, prisão, roubo. \n\n 4⃣ É tentar fugir ao ser abordado. ",
  
  "8. Quais são as safe zones? \n\n 1⃣ Zonas Safes: Praça, Delegacia, Hospital, Concessionária \n\n 2⃣ Delegacia, Hospital, Concessionária, Areas de Farm Legal \n\n 3⃣ Aeroporto, Garagem, Areas de Farm Legal \n\n 4⃣ Praça, Areas de Farm Legal, Hospital, Delegacia. ",
  
  "9. O que é VDM? \n\n 1⃣ É usar um Veiculo para matar alguém \n\n 2⃣ É matar alguém sem motivo. \n\n 3⃣ É ato de abusar da mecânica do jogo \n\n 4⃣ VDM é subir uma montanha com carro de drift. ",
  
  "10. Ao entrar no servidor você concorda com todas as regras nele impostas? \n\n 1⃣ Discordo \n\n 2⃣ Que regras? \n\n 3⃣ Nulo \n\n 4⃣ Concordo   "
  
], 
    channel: message.channel2, 
    time: 50000, 
    user: message.author 
  })
.then(respostas => {

  var exp = 0;
      if(respostas[3] === "3"){
        exp += 1;
      }
      if(respostas[4] === "3"){
        exp += 1;
      }
      if(respostas[5] === "2"){
        exp += 1;
      }
      if(respostas[6] === "2"){
        exp += 1;
      }
      if(respostas[7] === "3"){
        exp += 1;
      }
      if(respostas[8] === "1"){
        exp += 1;
      }
      if(respostas[9] === "3"){
        exp += 1;
      }
      if(respostas[10] === "1"){
        exp += 1;
      }
      if(respostas[11] === "1"){
        exp += 1;
      }
      if(respostas[12] === "4"){
        exp += 1;
      }
      if(exp >= "6"){
        message.author.send(`Você foi **aprovado**, parabéns! Você teve ${exp}/10 de acertos!`)
        channel2.delete()
      }
      else{
        message.author.send(`Você **reprovou** com ${exp}/10 de acertos! Tente novamente.`)
        channel2.delete()
      }

      if(exp >= result[0].margemdeacertos){

        console.log(exp)
      
          connection.query(`UPDATE vrp_users SET whitelisted = '1' WHERE id = '${respostas[1]}'`, (err, rows) => { //atualizando a whitelist do servidor
          });
          let nick = `[${respostas[1]}] ${respostas[2]}`;
          message.member.setNickname(nick);        
  
                // --------------------------------------------------------------- RESULTADO APROVADO PARA STAFFS

      const embedstaff = new Client.MessageEmbed()
      .setColor("#2b961f")//COR DA CAIXA DE DIALOGO
                        .setTitle(`Resultado da Whitelist\n`)
                        .addField('USUÁRIO:', `<@${message.author.id}>`)
                        .addField('ID:', `${respostas[1]}`)
                        .addField('NOME DO PERSONAGEM:', `${respostas[2]}`)
                        .addField('SITUAÇÃO:', `APROVADO`)
                        .addField('RESPOSTA PERGUNTA 1:', `${respostas[3]}`)
                        .addField('RESPOSTA PERGUNTA 2:', `${respostas[4]}`)
                        .addField('RESPOSTA PERGUNTA 3:', `${respostas[5]}`)
                        .addField('RESPOSTA PERGUNTA 4:', `${respostas[6]}`)
                        .addField('RESPOSTA PERGUNTA 5:', `${respostas[7]}`)
                        .addField('RESPOSTA PERGUNTA 6:', `${respostas[8]}`)
                        .addField('RESPOSTA PERGUNTA 7:', `${respostas[9]}`)
                        .addField('RESPOSTA PERGUNTA 8:', `${respostas[10]}`)
                        .addField('RESPOSTA PERGUNTA 9:', `${respostas[11]}`)
                        .addField('RESPOSTA PERGUNTA 10:', `${respostas[12]}`)
                        .addField('PONTUAÇÃO:', `${exp}/10`)
                        .setAuthor('Whitelist - By Adrian', result[0].imgwl, 'https://discord.gg/g94KmsENGg')
                        .setThumbnail(result[0].imgwl)
                        .setTimestamp(new Date())
                        .setFooter(`Parabéns! Agora ele pode entrar no servidor.`)
      client.channels.cache.get(result[0].resultadowlstaff).send(embedstaff)



      // --------------------------------------------------------------- RESULTADO APROVADO PARA USUÁRIOS
      
      const embed2 = new Client.MessageEmbed()
      .setColor("#2b961f")//COR DA CAIXA DE DIALOGO
                        .setTitle(`Resultado da Whitelist\n`)
                        .addField('USUÁRIO:', `<@${message.author.id}>`)
                        .addField('NOME DO PERSONAGEM:', `${respostas[2]}`)
                        .addField('SITUAÇÃO:', `APROVADO`)
                        .addField('PONTUAÇÃO:', `${exp}/10`)
                        .addField('IP do Servidor:', `${result[0].ip}:${result[0].porta}`)
                        .setAuthor('Whitelist - By Adrian', result[0].imgwl, 'https://discord.gg/g94KmsENGg')
                        .setThumbnail(result[0].imgwl)
                        .setTimestamp(new Date())
                        .setFooter(`Parabéns! Agora você pode entrar no servidor.>`)
      client.channels.cache.get(result[0].resultadowl_acertos).send(embed2)

      client.guilds.cache.get(result[0].iddoservidor).members.cache.get(message.author.id).roles.add(result[0].whitelistcargo)
      client.guilds.cache.get(result[0].iddoservidor).members.cache.get(message.author.id).roles.remove(result[0].nonwhitelistcargo)

      }else{
        console.log(exp)


      // ------------------------------------------------------- RESULTADO :REPROVADO: PARA STAFFS

        const embedstaff2 = new Client.MessageEmbed()
        .setColor("#ff0000")//COR DA CAIXA DE DIALOGO
                          .setTitle(`Resultado da Whitelist\n`)
                          .addField('USUÁRIO:', `<@${message.author.id}>`)
                          .addField('ID:', `${respostas[1]}`)
                          .addField('NOME DO PERSONAGEM:', `${respostas[2]}`)  
                          .addField('SITUAÇÃO:', `REPROVADO`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 1:', `${respostas[3]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 2:', `${respostas[4]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 3:', `${respostas[5]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 4:', `${respostas[6]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 5:', `${respostas[7]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 6:', `${respostas[8]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 7:', `${respostas[9]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 8:', `${respostas[10]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 9:', `${respostas[11]}`)
                          .addField('RESPOSTA - WHITELIST PERGUNTA 10:', `${respostas[12]}`)
                            .addField('PONTUAÇÃO:', `${exp}/10`)
                          .setAuthor('Whitelist - By Adrian', result[0].imgwl, 'https://discord.gg/g94KmsENGg')
                          .setThumbnail(result[0].imgwl)
                          .setTimestamp(new Date())
                          .setFooter(`Infelizmente, o mesmo reprovou. Mas pode refazer a whitelist!`)
        client.channels.cache.get(result[0].resultadowlstaff).send(embedstaff2)



      // -------------------------------------------------------------- RESULTADO REPROVADO PARA USERS


        const embed3 = new Client.MessageEmbed()
        .setColor("#ff0000")//COR DA CAIXA DE DIALOGO
                          .setTitle(`Resultado da Whitelist\n`)
                          .addField('USUÁRIO:', `<@${message.author.id}>`)
                          .addField('NOME DO PERSONAGEM:', `${respostas[2]}`)  
                          .addField('SITUAÇÃO:', `REPROVADO`)
                          .addField('PONTUAÇÃO:', `${exp}/10`)
                          .setAuthor('Whitelist - By Adrian', result[0].imgwl, 'https://discord.gg/g94KmsENGg')
                          .setThumbnail(result[0].imgwl)
                          .setTimestamp(new Date())
                          .setFooter(`Infelizmente, o mesmo reprovou. Mas pode refazer a whitelist!`)
        client.channels.cache.get(result[0].resultadowl_errados).send(embed3)
      }

    console.log(`O usuário terminou o formulário e estas foram as respostas: ${respostas} com a pontuação de ${exp}/10.`)
  })

  .catch(err => {
    if (err.message == 'time') {
      console.log(`O usuário ignorou o formulário e por isto foi cancelado.`)
      message.author.send(`Você reprovou pois o seu tempo acabou. Tente novamente.`)
      channel2.delete()
    } else if (err.message == 'channelDelete') {
      console.log(`O canal foi deletado e por isto o formulário foi cancelado.`)
      message.author.send(`Você reprovou pois o seu canal foi deletado. Tente novamente.`)
    } else {
      console.log(`Algo deu errado ao trabalhar o formulário!`, err)
      message.author.send(`Você reprovou pois aconteceu algo com o bot/servidor. Tente novamente.`, err)
      channel2.delete()
    }
})

    }

      )}

    }    