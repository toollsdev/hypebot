const Client = require("discord.js"); 
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
      nome: 'players',
      aliases: [],
      descricao: 'Comando para ver quantos ons tem.', 
      utilizacao: '!players',
      cooldown: 5
    },

run: async (client, message, args) => {
  connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{


    'use strict';
    var request = require('request');
    
    var url = `http://${result[0].ip}:${result[0].porta}/info.json`;
    
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          const slots = data['vars'].sv_maxClients;

// CONTAGEM


const FiveM = require("fivem-node-api");

const srv = new FiveM(`${result[0].ip}:${result[0].porta}`, {
  debug: true,
})
  .then(async (server) => {
    var tcpp = require('tcp-ping');
    tcpp.ping({ address: `${result[0].ip}`}, async(err, data, results)  =>{

    tcpp.probe(`${result[0].ip}`, result[0].porta, async (err, available) =>{
    
      if(available == true){
        const res = Intl.NumberFormat('en', {notation: 'standard',});

    const players = await server.getPlayersCount();
    const embed = new Client.MessageEmbed()
    .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                      .setTitle(`Status do Servidor`)
                      .setDescription('')
                      .addField("Quantidade de jogadores online:", `${players}`)
                      .addField("Quantidade de slots:", `${slots}`)
                      .addField("Status do Servidor:", `**Online!**`)
                      .addField("Ping:", `**${res.format(data.results[0].time)}ms**`)
                      .setThumbnail(`${result[0].imgwl}`)
                      .setTimestamp(new Date())
                      .setFooter(`HypeBot`)
                      message.channel.send(embed)
    }
    else{
      const players = await server.getPlayersCount();
      const embed = new Client.MessageEmbed()
      .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                        .setTitle(`Status do Servidor`)
                        .addField("Quantidade de jogadores online:", `${players}`)
                        .addField("Quantidade de slots:", `${slots}`)
                        .addField("Status do Servidor:", `**Offline!**`)
                        .setTimestamp(new Date())
                        .setFooter(`HypeBot`)
  
                        message.channel.send(embed)
    }
    // message.channel.send(`Olá, ${message.author}. Atualmente o servidor tem: ${players} jogadores onlines de ${slots} vagas!`)
  });
});
})
}
})
});
 


}
}