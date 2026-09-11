# HypeBot

> Meu primeiro bot para Discord — um projeto antigo que marcou o início da minha trajetória com programação e automação de comunidades.

O **HypeBot** foi criado para automatizar a whitelist de um servidor de roleplay no FiveM. Pelo Discord, o jogador responde a um formulário com perguntas sobre RP; o bot calcula a pontuação, registra o resultado e, quando aprovado, libera o acesso diretamente na base de dados do servidor.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js_12-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.js.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![FiveM](https://img.shields.io/badge/FiveM-F40552?style=flat-square&logo=fivem&logoColor=white)](https://fivem.net/)

## Sobre o projeto

Este código representa uma fase importante do meu aprendizado. Foi nele que tive meus primeiros contatos práticos com:

- criação de bots para Discord;
- comandos e eventos assíncronos;
- formulários interativos por mensagens;
- cargos, permissões e canais temporários;
- integração entre Discord, MySQL e FiveM;
- organização de comandos e eventos em módulos.

O projeto permanece público como parte do meu portfólio e da minha evolução como desenvolvedor.

## Funcionalidades

### Whitelist para FiveM

- Cria um canal privado para cada candidato.
- Aplica perguntas sobre conceitos e regras de roleplay.
- Define um limite de tempo para cada resposta.
- Calcula automaticamente a pontuação do formulário.
- Publica resultados separados para jogadores e equipe.
- Atualiza `vrp_users.whitelisted` no banco de dados após a aprovação.
- Ajusta o apelido e os cargos do jogador no Discord.

### Administração da comunidade

- Sistema de tickets com canais privados.
- Abertura e encerramento de atendimentos.
- Advertências e consulta do histórico de advertências.
- Banimento e limpeza de mensagens.
- Anúncios gerais e anúncios da whitelist.
- Mensagem automática de boas-vindas.

### Integração com o servidor

- Consulta de jogadores online.
- Gerenciamento de grupos, dinheiro e usuários na base do FiveM.
- Divulgação do endereço do servidor.
- Solicitação de setagem pelo Discord.

### Utilidades

- Ajuda e lista de comandos.
- Consulta de usuário e avatar.
- Sugestões e denúncias.

## Comandos encontrados no projeto

O prefixo padrão é `!` e pode ser alterado em `config.json`.

| Categoria | Comandos |
| --- | --- |
| Whitelist e FiveM | `!whitelist`, `!wl`, `!players`, `!money`, `!banuser`, `!group`, `!anunciarip` |
| Moderação | `!ban`, `!clear`, `!adv`, `!advs`, `!anunciar`, `!anunciarwl`, `!dc` |
| Atendimento | `!ticket`, `!openticket`, `!fticket`, `!fecharticket` |
| Comunidade | `!pedirset`, `!sugestao`, `!denunciar` |
| Utilidades | `!ajuda`, `!help`, `!userinfo`, `!avatar` |

Alguns comandos dependem de permissões, cargos, canais e colunas específicas configuradas no banco de dados.

## Tecnologias

- **Node.js** para executar a aplicação.
- **Discord.js 12.5** para comunicação com o Discord.
- **MySQL** para configurações e integração com a base vRP.
- **fivem-node-api** para recursos relacionados ao FiveM.
- **Moment.js**, `request` e `tcp-ping` como bibliotecas auxiliares.

## Executando localmente

> Este é um projeto legado. As dependências são antigas e podem exigir adaptações para funcionar com versões atuais do Node.js, Discord e FiveM.

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/toollsdev/hypebot.git
cd hypebot
npm install
```

Configure `config.json`:

```json
{
  "prefix": "!",
  "token": "TOKEN_DO_SEU_BOT",
  "conexaodb": "127.0.0.1",
  "userdb": "usuario_mysql",
  "senhadb": "senha_mysql",
  "db": "nome_do_banco"
}
```

Depois, inicie o bot:

```bash
node bot.js
```

O banco precisa conter a tabela `bot_cfg` com as configurações usadas pelos comandos e uma estrutura vRP compatível, incluindo a tabela `vrp_users`. O repositório não contém um arquivo de migração completo para criar essa estrutura automaticamente.

## Antes de usar

- Crie sua aplicação no [Discord Developer Portal](https://discord.com/developers/applications).
- Nunca publique o token do bot ou a senha do banco de dados.
- Restrinja o usuário MySQL às permissões realmente necessárias.
- Revise IDs de servidor, cargos, categorias e canais antes de executar os comandos.
- Atualize e audite o código antes de utilizá-lo em produção.

## Estado do projeto

Este projeto está **arquivado como registro histórico** e não representa a forma como desenvolvo aplicações atualmente. O código foi preservado para mostrar meu ponto de partida, os problemas que eu tentava resolver e o quanto evoluí desde o meu primeiro bot.

## Autor

Desenvolvido por **[toollsdev](https://github.com/toollsdev)**.

Se você chegou até aqui, obrigado por conhecer um pedaço do começo da minha jornada. 🚀
