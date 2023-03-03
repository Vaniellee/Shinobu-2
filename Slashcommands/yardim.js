const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication, EmbedBuilder } = require("discord.js");
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows My help"),

  async execute(interaction, client) {




    const { user, guildId, channel } = interaction;

    const pingmessage = `_Shinobu'nun komutlarına ulaşmak için **-help** yazabilirsin!_`

    await interaction.reply(
      {
        content: pingmessage,
        ephemeral: true,
      }
    );



  }
};