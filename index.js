const { Client, Intents, MessageButton, MessageActionRow } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('your order', {type: 'LISTENING'});

  const guild = client.guilds.cache.get(process.env.GUILD_ID)
  let commands = guild ? guild.commands : client.application?.commands

  commands?.create({
      name: 'ping',
      description: 'Replies with Pong!',
  })
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
        );
    await interaction.reply({ content: 'Pong!', components: [row] });
  }
});

client.login(process.env.BOT_TOKEN);