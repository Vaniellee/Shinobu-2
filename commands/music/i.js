const moment = require("moment")
moment.locale("tr")
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: 'istatistik',
  aliases: ["i"],
  utilisation: '{prefix}save',
  voiceChannel: false,
  showHelp: true,

  execute(client, message) {
    const istatistik = new MessageEmbed()
      .setThumbnail(message.author.avatarURL({ dynamic: true }))

      .setAuthor(`${client.user.username} Statistics.`, client.user.avatarURL({ size: 1024 }))
      .setDescription(`**
    • User Count: \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\`
    • Server Count: \`${client.guilds.cache.size}\`
    • Channel Count: \`${client.channels.cache.size}\`
    • Connected Voice: \`${client?.voice?.adapters?.size || 0}\`
    • Command Count: \`${client.commands.map(c => c.name).length}\`
    • Node.js Version: \`${process.version}\`
    • Operation Time: <t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>
    • Ping: \`${client.ws.ping} MS\`
    • Memory Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
    • OS: \`${process.platform}\`
    **`)
      .setImage("https://media.tenor.com/APwm24eVEoYAAAAC/demon-slayer-kimetsu-no-yaiba.gif")


    message.reply({ embeds: [istatistik] })
  }
}  