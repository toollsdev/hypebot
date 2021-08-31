module.exports = {
    config: {
      nome: 'ban',                                                   
      aliases: ['banir'],                          
      descricao: 'Comando que bane o usuário.',     
      utilizacao: '!ban [USUARIO] [MOTIVO]',
      cooldown: 3
    },
    run: async (client, message, args) => {

        if(!message.member.hasPermission("BAN_MEMBERS")) return;
            if(!args[0]) return;
            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!banMember) return message.reply("não foi possível encontrar este usuário!");
            
            message.delete({timeout:1000})
            if(banMember == message.member) return message.reply("você não pode se banir!");
            if (message.member.roles.highest.position <= banMember.roles.highest.position) return message.reply("você não tem permissão para banir esse membro, ele tem um cargo superior ao seu!"); 
            if (message.guild.me.roles.highest.position <= banMember.roles.highest.position) return message.reply("não tenho permissão para banir esse membro, ele tem um cargo superior ao meu!");
            
              message.reply("`" + banMember.user.tag + "` banido com sucesso!");
              banMember.ban();
                }
}