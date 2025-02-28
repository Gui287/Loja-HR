require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Criar um cliente para o bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Inicialize client.commands como um Map
client.commands = new Map();

// Carregar comandos
const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  client.commands.set(command.data.name, command);
  commands.push(command.data);
}

// Registrar os comandos no Discord
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registrando comandos de Slash...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log('Comandos de Slash registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();

// Quando o bot estiver pronto
client.once('ready', () => {
  console.log(`Bot está online como ${client.user.tag}`);
});

// Gerenciar interações (comandos de Slash)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (command) {
    try {
      // Aqui garantimos que todas as respostas sejam ephemeral
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
    }
  }
});

// Login do bot com o token
client.login(process.env.DISCORD_TOKEN);
