import { Client, Events, GatewayIntentBits, StringSelectMenuBuilder, ActionRowBuilder, } from 'discord.js';
import fs from 'fs';

import 'dotenv/config';
import commands from './commands';

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});


client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

let executed = false;
client.on('ready', (c) => {
  console.log(`Logged in as ${client.user?.tag}!`);

  // 註冊指令
  const data = commands.map(v => v.builder);
  for (const guild of [
    c.guilds.cache.get('763690576209903627'),
    c.guilds.cache.get('763690576209903627'),
  ]) {
    guild?.commands.set(data);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(v => v.builder.name == interaction.commandName);
  if (!command) return;

  command.execute(interaction);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'example_menu') {
    const selected = interaction.values[0]; // 獲取選中的值
    interaction.update({
      content: selected,
      components: [],
    });
  }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
