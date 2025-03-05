import { ActionRowBuilder, ButtonBuilder, ComponentType, SlashCommandBuilder } from 'discord.js';

import menu from '../../meun.json';
import oldMenu from '../../oldm.json';

import type { Command } from '.';

const row1 = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('eat-option-1')
      .setEmoji('1️⃣')
      .setLabel('飯食'),
    new ButtonBuilder()
      .setCustomId('eat-option-2')
      .setEmoji('2️⃣')
      .setLabel('麵食'),
    new ButtonBuilder()
      .setCustomId('eat-option-3')
      .setEmoji('3️⃣')
      .setLabel('鍋燒'),
    new ButtonBuilder()
      .setCustomId('eat-option-4')
      .setEmoji('4️⃣')
      .setLabel('炸物'),
    new ButtonBuilder()
      .setCustomId('eat-option-5')
      .setEmoji('5️⃣')
      .setLabel('老麥(單點)'),
  );

const row2 = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('eat-option-6')
      .setEmoji('6️⃣')
      .setLabel('老麥(套餐)'),
  );

export default {
  builder: new SlashCommandBuilder()
    .setName('你想吃什麼')
    .setDescription('隨機抽取你想要的食物類型'),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: '你有什麼想吃的食物類型',
      components: [row1, row2],
    });

    const collector = sent.createMessageComponentCollector({
      // 過濾使用者
      filter: (i) => i.user.id === interaction.user.id,
      componentType: ComponentType.Button,
      max: 1,
    });

    collector.on('collect', async (inter) => {
      switch (inter.customId) {
        case 'eat-option-1': {
          let ram = Math.floor(((Math.random()) * 10000) % 14);
          const s = menu.meals[ram];
          await inter.update(s.name.toString() + '  ' + s.price.toString());// 索引 1 對應到第二個元素
          break;
        }

        case 'eat-option-2': {
          let ram = Math.floor(((Math.random()) * 10000) % 11);
          const s = menu.Pasta[ram];
          await inter.update(s.name.toString() + '  ' + s.price.toString());
          break;
        }

        case 'eat-option-3': {
          let ram = Math.floor(((Math.random()) * 10000) % 18);
          const s = menu.Potroast[ram];
          await inter.update(s.name.toString() + '  ' + s.price.toString());
          break;
        }

        case 'eat-option-4': {
          let ram = Math.floor(((Math.random()) * 10000) % 9);
          const s = menu.Friedfood[ram];
          await inter.update(s.name.toString() + '  ' + s.price.toString());
          break;
        }

        case 'eat-option-5': {
          let ram1 = Math.floor(((Math.random()) * 10000) % 20);
          const s1 = oldMenu.mainmeal[ram1];
          await inter.update(s1.name.toString());
          break;
        }

        case 'eat-option-6': {
          let ram1 = Math.floor(((Math.random()) * 10000) % 20);
          let ram2 = Math.floor(((Math.random()) * 10000) % 3);
          let ram3 = Math.floor(((Math.random()) * 10000) % 4);
          const s1 = oldMenu.mainmeal[ram1];
          const s2 = oldMenu.Comeswithmeal[ram2];
          const s3 = oldMenu.drinks[ram3];
          await inter.update(s1.name.toString() + '　' + '+' + '　' + s2.name.toString() + '　' + '+' + '　' + s3.name.toString());
          break;
        }

        default: {
          await await inter.update('未知的選項');
          break;
        }
      }
    });
  }
} as Command;
