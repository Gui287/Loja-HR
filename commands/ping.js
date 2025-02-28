module.exports = {
  data: {
    name: 'ping',
    description: 'Responde com Pong!',
  },
  async execute(interaction) {
    // Responde com uma mensagem ephemeral usando a flag correta
    await interaction.reply({ content: 'Pong!', flags: 64 });
  },
};
