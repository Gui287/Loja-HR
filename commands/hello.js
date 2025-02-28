module.exports = {
  data: {
    name: 'hello',
    description: 'Responde com Olá!',
  },
  async execute(interaction) {
    // Responde com uma mensagem ephemeral usando a flag correta
    await interaction.reply({ content: 'Olá! Como posso ajudar?', flags: 64 });
  },
};
