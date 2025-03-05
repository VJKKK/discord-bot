import type { Awaitable, ChatInputCommandInteraction, SharedSlashCommand } from 'discord.js';
import eat from './eat';
import food from './food';

export interface Command {
  builder: SharedSlashCommand;
  execute(interaction: ChatInputCommandInteraction): Awaitable<void>;
}

export default [eat, food];
