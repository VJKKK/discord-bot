import { ActionRowBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';

import type { Command } from '.';
import { readFileSync } from 'fs';

interface meunjs {
  meals: {
    name: string,
    price: string;
  }[],
  Pasta: {
    name: string,
    price: string;
  }[],
  Potroast: {
    name: string,
    price: string;
  }[],
  Friedfood: {
    name: string,
    price: string;
  }[];
}
interface oldmjs {
  mainmeal: {
    name: string;
  }[],
  Comeswithmeal: {
    name: string;
  }[],
  drinks: {
    name: string;
  }[];
}


export default {
  builder: new SlashCommandBuilder()
    .setName('食物選單')
    .setDescription('跟上面一樣'),
  async execute(interaction) {

    const rawData2: oldmjs = JSON.parse(readFileSync('./oldm.json', 'utf-8'));
    const rawData: meunjs = JSON.parse(readFileSync('./meun.json', 'utf-8'));
    let ram1: number = Math.floor(((Math.random()) * 10000) % 14);
    const s1 = rawData.meals[ram1];
    let ram2: number = Math.floor(((Math.random()) * 10000) % 11);
    const s2 = rawData.Pasta[ram2];
    let ram3: number = Math.floor(((Math.random()) * 10000) % 18);
    const s3 = rawData.Potroast[ram3];
    let ram4: number = Math.floor(((Math.random()) * 10000) % 9);
    const s4 = rawData.Friedfood[ram4];
    let ram51: number = Math.floor(((Math.random()) * 10000) % 20);
    const s51 = rawData2.mainmeal[ram51];
    let ram61: number = Math.floor(((Math.random()) * 10000) % 20);
    let ram62: number = Math.floor(((Math.random()) * 10000) % 3);
    let ram63: number = Math.floor(((Math.random()) * 10000) % 4);
    const s61 = rawData2.mainmeal[ram61];
    const s62 = rawData2.Comeswithmeal[ram62];
    const s63 = rawData2.drinks[ram63];
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

    await interaction.reply({
      content: '請選擇一個選項：',
      components: [row],
      ephemeral: true, // 是否僅用戶可見
    });
  },
} as Command;
