import { Client, Events, GatewayIntentBits, StringSelectMenuBuilder, ActionRowBuilder, } from 'discord.js';

import commands from './commands';

import 'dotenv/config';

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
    c.guilds.cache.get('1319472790222409808'),
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

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
