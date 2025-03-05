import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '.';

export default {
  builder: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute(interaction) {
    await interaction.reply('Pong!');
  },
} as Command;
