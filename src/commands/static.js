
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("static")
    .setDescription("🤖 |If you want to know about me."),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
const embed = new Discord.EmbedBuilder()



.setAuthor({name: "Raven - Bot Static!", iconURL: client.user.avatarURL()})
.setThumbnail(interaction.user.avatarURL()) 
.addFields({name: "• User Count:", value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, inline: true})
.addFields({name: "• Server Count:", value: `${client.guilds.cache.size.toLocaleString()}`, inline: true})
.addFields({name: "• Channel Count:", value: `${client.channels.cache.size.toLocaleString()}`, inline: true})
.addFields({name: "• Connected Voice:", value: `${client?.voice?.adapters?.size || 0}`, inline: true})
.addFields({name: "• Command Count:", value: `${client.commands.map(c => c.name).length}`, inline: true})
.addFields({name: "• Node.js Version:", value: `${process.version}`, inline: true})
.addFields({name: "• Operation Time:", value: `<t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>`, inline: true})
.addFields({name: "• Ping:", value: `${client.ws.ping} MS`, inline: true})
.addFields({name: "• Memory Usage:", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true})
.addFields({name: "• OS:", value: `${process.platform}`, inline: true})
.setColor("Orange")
 return interaction.followUp({embeds: [embed]})


 }
}
