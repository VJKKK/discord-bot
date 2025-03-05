import { ActionRowBuilder, ComponentType, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';

import menu from '../../meun.json';
import oldMenu from '../../oldm.json';

import type { Command } from '.';

export default {
  builder: new SlashCommandBuilder()
    .setName('食物選單')
    .setDescription('跟上面一樣'),
  async execute(interaction) {
    let ram1: number = Math.floor(((Math.random()) * 10000) % 14);
    const s1 = menu.meals[ram1];

    let ram2: number = Math.floor(((Math.random()) * 10000) % 11);
    const s2 = menu.Pasta[ram2];

    let ram3: number = Math.floor(((Math.random()) * 10000) % 18);
    const s3 = menu.Potroast[ram3];

    let ram4: number = Math.floor(((Math.random()) * 10000) % 9);
    const s4 = menu.Friedfood[ram4];

    let ram51: number = Math.floor(((Math.random()) * 10000) % 20);
    const s51 = oldMenu.mainmeal[ram51];

    let ram61: number = Math.floor(((Math.random()) * 10000) % 20);
    let ram62: number = Math.floor(((Math.random()) * 10000) % 3);
    let ram63: number = Math.floor(((Math.random()) * 10000) % 4);
    const s61 = oldMenu.mainmeal[ram61];
    const s62 = oldMenu.Comeswithmeal[ram62];
    const s63 = oldMenu.drinks[ram63];

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('example_menu')
      .setPlaceholder('請選擇一個選項')
      .addOptions(
        {
          label: '飯食',
          description: '隨機選擇飯食類食物',
          value: `${s1.name.toString()}`,
        },
        {
          label: '麵食',
          description: '隨機選擇麵食類食物',
          value: `${s2.name.toString()}`,
        },
        {
          label: '鍋燒',
          description: '隨機選擇鍋燒類食物',
          value: `${s3.name.toString()}`,
        },
        {
          label: '炸物',
          description: '隨機選擇炸物類食物',
          value: `${s4.name.toString()}`,
        },
        {
          label: '老麥(單點)',
          description: '隨機選擇單點的主食',
          value: `${s51.name.toString()}`,
        },
        {
          label: '老麥(套餐)',
          description: '隨機選擇套餐',
          value: `${s61.name.toString()} + ${s62.name.toString()} + ${s63.name.toString()}`,
        }
      );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    const sent = await interaction.reply({
      content: '請選擇一個選項：',
      components: [row],
      ephemeral: true, // 是否僅用戶可見
    });

    const collector = sent.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      componentType: ComponentType.StringSelect,
      max: 1,
    });

    collector.on('collect', async (inter) => {
      const selected = inter.values[0]; // 獲取選中的值
      await inter.update({
        content: selected,
        components: [],
      });
    });
  },
} as Command;
