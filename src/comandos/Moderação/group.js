const Discord = require("discord.js");
const mysql = require('mysql'); 
  // Initialization

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
    nome: 'group',                                                   // NOTA: Coloque o nome do comando SEMPRE em letras minúsculas!
    aliases: ['setgroup'],                               // Alternativas para o comando, para você poder usar o comando com vários nomes diferentes.
    descricao: 'Teste',     // Descrição do comando (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
    utilizacao: '',                                               // Modo de utilização do comando. Deixe em branco, ou seja, apenas com '', caso o comando não precise de argumentos para ser usado (OPCIONAL, porém é útil para organização ou para um comando de ver a informação de outros comandos).
    cooldown: 3                                                   // 3 segundos de tempo de espera até o usuário poder executar o comando de novo. Caso o comando não tenha tempo de espera, pode remover esta linha ou colocar     cooldown: 0
  },
  run: async (client, message, args) => {
    connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{
  })

    sql = connection.query(`UPDATE bot_advs SET motivo = JSON_INSERT('$.C', '[3, 4]') where user_id = '${args[1]}'`, (err, rows) => { //atualizando a whitelist do servidor
         if (err) throw err;
         console.log(rows)
         console.log('Executado, porém, resultou?', rows.affectedRows)
  });

    }
}